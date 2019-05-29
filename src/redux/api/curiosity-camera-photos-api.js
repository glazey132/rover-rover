export const fetchCuriosityCameraPhotos = async (cameraType, date) => {
    try {
        // change check for date here to not check for date and enforce searching with date as a needed param
        console.log('the cameratype in cury camera photos =: ', cameraType, date)
        const response = cameraType === 'ALL' ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                                        : await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching curiosity camera photos => ', error)
    }
};