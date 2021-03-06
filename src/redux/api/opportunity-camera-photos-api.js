export const fetchOpportunityCameraPhotos = async (cameraType, date) => {
    try {
        const response = date === null ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                                        : await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${date}&camera=${cameraType}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching opportunity camera photos => ', error)
    }
};