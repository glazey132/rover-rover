import React , { Component } from 'react';


//bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';



class DatePicker extends Component {
    render() {
        return (
            <InputGroup size="sm" className="mb-3">
                <FormControl
                    placeholder="Date: YYYY-MM-DD"
                    aria-label="date"
                />
                <InputGroup.Append>
                <Button variant="outline-primary">Set search date</Button>
                </InputGroup.Append>
            </InputGroup>


        )
    }
}

export default DatePicker;