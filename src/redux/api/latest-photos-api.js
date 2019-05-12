export const fetchRecentOpportunityPhotos = async () => {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching recent opportunity photos => ', error)
    }
};

export const fetchRecentCuriosityPhotos = async () => {
    try {
        console.log('trying to fetch curiosity photos')
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
		console.log("TCL: fetchRecentCuriosityPhotos -> response", response)
        const data = await response.json();
		console.log("TCL: fetchRecentCuriosityPhotos -> data", data)
        return data;
    } catch(error) {
        console.log('error fetching recent curiosity photos => ', error)
    }
}

export const fetchRecentSpiritPhotos = async () => {
    try {
        console.log('trying to fetch spirit photos')
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
		console.log("TCL: fetchRecentSpiritPhotos -> response", response)
        const data = await response.json();
		console.log("TCL: fetchRecentSpiritPhotos -> data", data)
        return data;
    } catch(error) {
        console.log('error fetching recent spirit photos => ', error)
    }
}