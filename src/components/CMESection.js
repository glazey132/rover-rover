import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme'

import SimpleBarGraph from './charts/SimpleBarGraph';

import {ResponsiveContainer} from 'recharts';

//bootstrap components
import Spinner from 'react-bootstrap/Spinner';

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
    }

    render() {
        const { cmeData } = this.state;
        const { size, isCMEFetching } = this.props;
        return (
            isCMEFetching ?  <div style={loadingStyle}><Spinner animation="border" variant="primary" /></div>
            :
            <div style={graphContainerStyle}>
                <h6 style={titleStyle}>Most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</h6>
                <SimpleBarGraph data={this.props.data} size={size} />
            </div>
        )
    }
}

const loadingStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    display: 'flex'
}

const titleStyle = {
    display: 'inline-flex'
}

const graphContainerStyle = {
    padding: '20px'
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

const mapStateToProps = state => ({ 
    data: state.cmeData,
    isCMEFetching: state.cmeData.isCMEFetching
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ requestCmeData }, dispatch)

const sizedApp = sizeMe({ monitorHeight: true })(CMESection);
export default connect(mapStateToProps, mapDispatchToProps)(sizedApp);