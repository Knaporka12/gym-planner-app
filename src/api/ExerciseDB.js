const API_KEY = process.env.REACT_APP_RAPID_API_KEY;

export const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';
export const exerciseDBDefaultOptions = {
    params: { limit: '1200' },
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${API_KEY}`,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};