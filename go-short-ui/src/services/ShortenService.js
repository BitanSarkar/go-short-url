import axios from 'axios';

const ShortenService = {
  shortenUrl: async (url) => {
    try {
      const response = await axios.post('https://s.bitsar.net/generate', { url });
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
};

export default ShortenService;
