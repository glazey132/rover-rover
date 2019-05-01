export const fetchData = async () => {
    console.log('saga successfully called fetchData')
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CMEAnalysis`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error fetching cme data => ', error)
    }
};