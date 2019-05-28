export const fetchCuriosityCameraPhotos = async (cameraType, date) => {
    try {
        const response = !date ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                                        : await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching curiosity camera photos => ', error)
    }
};