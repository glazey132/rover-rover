import React , { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSearchDate  } from '../redux/actions/set-search-date';

//bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          dateType: 'earth'
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
      handleChange(date) {
        console.log('the date from date pick => ', date)
        this.props.setSearchDate(date)
      }

      handleToggle(dateType, event) {
        this.setState({
            dateType
        })
      }
      
    render() {
        const { dateType } = this.props;
        return (
            dateType === 'earth' ?
                 <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            :
            <input
                placeholder="sol-days"
                style={solInputStyle}
            />
        )
    }
}

const solInputStyle = {
    display: 'inline-flex',
    height: 'calc(2.25rem + 2px)',
    lineHeight: '1.5',
    padding: '.375rem .75rem',
    border: '1px solid #ced4da',
    borderColor: '#fff',
    borderClip: 'padding-box',
    borderRadius: '.25rem',
    transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
}
const mapStateToProps = state => ({ 
    dateType: state.dates.dateType,
    date: state.dates.date 
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        setSearchDate
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerComponent);