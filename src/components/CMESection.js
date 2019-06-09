import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sizeMe from 'react-sizeme'

import SimpleBarGraph from './charts/SimpleBarGraph';
import LatLongScatterChart from './charts/LatLongScatterChart';

//bootstrap components
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { requestCmeData } from '../redux/actions/fetch-cme-data';
import { setCmeTab } from '../redux/actions/set-cme-tab';

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
        const { cmeTab, data } = this.props;
        console.log("TCL: CMESection -> render -> cmeTab", cmeTab)
        console.log("cme data ? ", data)
        const { size, isCMEFetching } = this.props;
        return (
            isCMEFetching ?  <div style={loadingStyle}><Spinner animation="border" variant="primary" /></div>
            :
            cmeTab === 'speed' ?
            <div style={graphContainerStyle}>
                <header style={cmeHeaderStyle}>
                    <Tabs 
                        defaultActiveKey="speed" 
                        id="uncontrolled-tab-example"
                        onSelect={key => this.props.setCmeTab({ key })}
                    >
                    <Tab eventKey="speed" title="speed">
                        <p>Speed of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="halfAngle" title="halfAngle">
                        <p>Half angle of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="latitude-longitude" title="lat/long">
                        <p>Latitude and Longitude of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    </Tabs>
                </header>
                <SimpleBarGraph data={this.props.data} size={size} />
            </div>
            : cmeTab === 'halfAngle' ?
            <div style={graphContainerStyle}>
                <header style={cmeHeaderStyle}>
                    <Tabs 
                        defaultActiveKey="speed" 
                        id="uncontrolled-tab-example"
                        onSelect={key => this.props.setCmeTab({ key })}
                    >
                    <Tab eventKey="speed" title="speed">
                        <p>Speed of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="halfAngle" title="halfAngle">
                        <p>Half angle of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="latitude-longitude" title="lat/long">
                        <p>Latitude and Longitude of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    </Tabs>
                </header>
                <SimpleBarGraph data={this.props.data} size={size} />
            </div>
            :
            <div style={graphContainerStyle}>
                <header style={cmeHeaderStyle}>
                    <Tabs 
                        defaultActiveKey="speed" 
                        id="uncontrolled-tab-example"
                        onSelect={key => this.props.setCmeTab({ key })}
                    >
                    <Tab eventKey="speed" title="speed">
                        <p>Speed of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="halfAngle" title="halfAngle">
                        <p>Half angle of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    <Tab eventKey="latitude-longitude" title="lat/long">
                        <p>Latitude and Longitude of most recently recorded CMEs (Coronal Mass Ejections a.k.a Solar Flares)</p>
                    </Tab>
                    </Tabs>
                </header>
                <LatLongScatterChart data={this.props.data} size={size} />
            </div>
        )
    }
}

const cmeHeaderStyle = {
    display: 'inline-flex'
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
    isCMEFetching: state.cmeData.isCMEFetching,
    cmeTab: state.cmeSelections.cmeTab
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ 
        requestCmeData,
        setCmeTab
     }, dispatch)

const sizedApp = sizeMe({ monitorHeight: true })(CMESection);
export default connect(mapStateToProps, mapDispatchToProps)(sizedApp);