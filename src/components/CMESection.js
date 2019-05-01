import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme'

import SimpleBarGraph from './charts/SimpleBarGraph';

import {ResponsiveContainer} from 'recharts';

import Button from 'react-bootstrap/Button';

import { requestCmeData } from '../redux/actions/fetch-cme-data';

class CMESection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cmeData: null
        }
    }

    

   async componentDidMount() {
       this.props.requestCmeData();
        // fetch(`https://cors-anywhere.herokuapp.com/https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CMEAnalysis`)
        // .then(response => {
        //     response.json().then(data => ({
        //         data: data,
        //         status: response.status
        //     }))
        // .then(res => {
        //     console.log('res.data => ', res.data)
        //     this.setState({
        //         cmeData: res
        //     })
        // })
        // .catch(error => {  
        // console.log('Request failed', error)  
        // });
        // })
    }


    checkProps = () => {
        console.log('clicked!!!')
        console.log('the props in cme => ', this.props)
    }

    render() {
        const { cmeData } = this.state;
        const { size } = this.props;
        return (
            <div style={graphContainerStyle}>
                <SimpleBarGraph data={this.props.data} size={size} />
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

const mapStateToProps = state => ({ data: state.cmeData })

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestCmeData }, dispatch)

const sizedApp = sizeMe({ monitorHeight: true })(CMESection);
export default connect(mapStateToProps, mapDispatchToProps)(sizedApp);