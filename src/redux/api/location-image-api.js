export const requestLocationImage = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lat=${latitude}&lon=${longitude}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching location image from api => ', error)
    }
};