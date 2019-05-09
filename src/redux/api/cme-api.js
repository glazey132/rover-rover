export const fetchData = async () => {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CMEAnalysis`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching cme data => ', error)
    }
};