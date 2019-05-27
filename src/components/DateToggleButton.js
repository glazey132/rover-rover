import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDateType  } from '../redux/actions/set-dateType';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class DataToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ToggleButtonGroup name="dateType" toggle={true} aria-label="Date-type Toggle" onChange={this.props.setDateType}>
                <ToggleButton value={'earth'} variant="primary">Earth Date</ToggleButton>
                <ToggleButton value={'sol'} variant="primary">Sol date</ToggleButton>
            </ToggleButtonGroup>
        )
    }   
}

const mapStateToProps = state => ({ dateType: state.dates.dateType })

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        setDateType
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DataToggleButton);