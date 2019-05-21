export const fetchCuriosityCameraPhotos = async (cameraType) => {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching curiosity camera photos => ', error)
    }
};