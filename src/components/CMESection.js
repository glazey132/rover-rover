import React from 'react';

import sizeMe from 'react-sizeme'

import SimpleBarGraph from './charts/SimpleBarGraph';

import {ResponsiveContainer} from 'recharts';

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
        const { size } = this.props;
        console.log('the cme Data ', cmeData)
        return (
            <div style={graphContainerStyle}>
                <SimpleBarGraph data={cmeData} size={size} />
            </div>
        )
    }
}

const graphContainerStyle = {
    padding: '20px',
    display: 'inline-flex'
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

export default sizeMe({ monitorHeight: true })(CMESection);