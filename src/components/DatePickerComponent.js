import React , { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSearchDate  } from '../redux/actions/set-search-date';

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
          date: new Date(),
          dateType: 'earth',
          solDate: null
        };
        this.handleDateSelection = this.handleDateSelection.bind(this);
    }
    
      handleSearch = () => {
        if(this.state.date) {
          this.props.setSearchDate(this.state.date)
        }
      }
    
      handleDateSelection = (date) => {
        this.setState({
            date: date
        })
      }


      handelInputChange = (e) => {
          this.setState({
            solDate: e.target.value
          })
      }

      handleToggle(dateType) {
        this.setState({
            dateType
        })
      }

      sendSolFilter = () => {
          const solDate = this.state.solDate;
          if (solDate && solDate >= 1) {
            this.props.setSearchDate(solDate, 'sol');
          } else {
              console.log('invalid sol date');
          }
      }


      
    render() {
        console.log('this.props  .in date picker -> ', this.props)
        const { dateType } = this.props;
        return (
            dateType === 'earth_date' ?
                <div style={solInputStyle}>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        showYearDropdown
                        selected={this.state.date}
                        onChange={this.handleDateSelection}
                    />
                    <Button style={this.props.screenSize.width < 425 ? mobileSizedButtonStyle : biggerSizedButtonStyle}onClick={this.handleSearch} variant="danger">Search</Button>
                </div>
            :
            <div style={solInputStyle}>
                <input placeholder="Martian sol"/>
                <Button variant="primary">Search</Button>
            </div>
            
        )
    }
}

const mobileSizedButtonStyle = {
    lineHeight: '1.2rem'
}

const biggerSizedButtonStyle = {
    lineHeight: '1.5rem'
}

const solInputStyle = {
    display: 'inline-flex',
    lineHeight: '1.5',
    borderColor: '#fff',
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