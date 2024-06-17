const API_KEY = process.env.REACT_APP_RAPID_API_KEY;

export const VIDEO_API_BASE_URL = 'https://youtube-search-and-download.p.rapidapi.com';
export const videosApiDefaultoptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${API_KEY}`,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};