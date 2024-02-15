import json
import string
import uuid
import boto3
import random
from datetime import datetime, timedelta
import urllib.parse

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ShortenURLDB')

def generate_random_key(length):
    characters = string.ascii_letters + string.digits + '-_'
    return ''.join(random.choice(characters) for i in range(length))

def is_key_exists(key):
    response = table.get_item(Key={'keyId': key})
    return 'Item' in response
    
def is_valid_url(url):
    try:
        parsed_url = urllib.parse.urlparse(url)
        if parsed_url.scheme and parsed_url.netloc:
            print("Valid URL pattern")
            return True
        else:
            print("Invalid URL pattern")
            return False
    except ValueError:
        print("Invalid URL format")
        return False

def lambda_handler(event, context):
    print(event)
    if event["httpMethod"] != 'POST':
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Type needs to be post only'})
        }
    original_url = json.loads(event['body'])['url']
    if not is_valid_url(original_url):
        return {
            'statusCode': 400,
            'body': json.dumps({'message': "Invalid URL"}),
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
            }
        }
    ttl_expiry = (datetime.now() + timedelta(days=365)).timestamp()
    while True:
        short_key = generate_random_key(7)
        if not is_key_exists(short_key):
            break
    table.put_item(Item={
        'keyId': short_key,
        'originalURL': original_url,
        'ttl': int(ttl_expiry)
    })
    short_url = f"https://s.bitsar.net/{short_key}"
    return {
        'statusCode': 200,
        'body': json.dumps({'shortURL': short_url}),
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS, POST',
        }
    }