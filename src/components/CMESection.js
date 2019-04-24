import React from 'react';

import Button from 'react-bootstrap/Button';

class CMESection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cmeData: null
        }
    }

    

   async componentDidMount() {
        fetch(`https://cors-anywhere.herokuapp.com/https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CMEAnalysis`)
        .then(response => {
            response.json().then(data => ({
                data: data,
                status: response.status
            }))
        .then(res => {
            console.log('res.data => ', res.data)
            this.setState({
                cmeData: res
            })
        })
        .catch(error => {  
        console.log('Request failed', error)  
        });
        })
    }

    checkState = () => {
        console.log(this.state)
    }

    render() {
        const { cmeData } = this.state;
        return (
            <div style={cmeSectionStyle}>
            {cmeData !== null ? 
                cmeData.data.map(item =>
                    <ul style={cmeItemSectionStyle}>
                        <li style={cmeItemStyle}>time: {item.time21_5}</li>
                        <li style={cmeItemStyle}>id: {item.associatedCMEID}</li>
                        <li style={cmeItemStyle}>catalog: {item.catalog}</li>
                        <li style={cmeItemStyle}>half angle: {item.halfAngle}</li>
                        <li style={cmeItemStyle}>is most accurate: {item.isMostAccurate}</li>
                        <li style={cmeItemStyle}>latitude: {item.latitude}</li>
                        <li style={cmeItemStyle}>longitude: {item.longitude}</li>
                        <li style={cmeItemStyle}>note: {item.note}</li>
                        <li style={cmeItemStyle}>speed: {item.speed}</li>
                        <li style={cmeItemStyle}>type: {item.type}</li>
                    </ul>
                    
                )
                :
                <li>Unable to fetch data</li>
            }
            </div>
            
        )
    }
}

const cmeItemSectionStyle = {
    border: '1px solid black',
    padding: '5px',
    margin: '5px',
    flex: '1'
}

const cmeSectionStyle = {
    display: 'flex',
    flexDirection: 'row',
}

const cmeItemStyle = {
    listStyle: 'none'
}

export default CMESection;