import React , { Component } from 'react';


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
        this.setState({
          startDate: date
        });
      }

      handleToggle(dateType, event) {
        this.setState({
            dateType
        })
      }
      
    render() {
        return (
            <p>test</p>
        )
    }
}

export default DatePickerComponent;