import React , { Component } from 'react';


//bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }
    render() {
        return (
            <DatePicker
             selected={this.state.startDate}
             onChange={this.handleChange}
            />
        )
    }
}

export default DatePickerComponent;