import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ShortenURLDB')

def lambda_handler(event, context):
    if event["httpMethod"] != 'GET':
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'only get is allow'})
        }
    short_key = event['path'][1:]
    response = table.get_item(Key={'keyId': short_key})
    if 'Item' in response:
        original_url = response['Item']['originalURL']
        return {
            'statusCode': 302,
            'headers': {'Location': original_url}
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps({'error': 'Short URL not found'})
        }