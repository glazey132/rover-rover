export const fetchDatePhotos = async (rover, date, camera, dateType, solDate) => {
    try {
        const response = solDate ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${solDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                            : camera === 'ALL' ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                            : await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${date}&camera=${camera}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        console.log('data from fetch date photos => ', data)
        return data;
    } catch (error) {
        console.log('error fetching curiosity camera photos => ', error)
    }
};