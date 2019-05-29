export const fetchDatePhotos = async (rover, date, camera, dateType) => {
    try {
        console.log('in fetch date photos here is rover, date, camera => ', rover, date, camera, dateType);
        const response = camera === 'ALL' ? await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${date}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
                                            : await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${dateType}=${date}&camera=${camera}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        console.log("TCL: fetchDatePhotos -> response", response)
        const data = await response.json();
        console.log("TCL: fetchDatePhotos -> data", data)
        return data;
    } catch (error) {
        console.log('error fetching curiosity camera photos => ', error)
    }
};