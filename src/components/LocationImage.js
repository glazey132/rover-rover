import React, {Component} from 'react';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import _ from 'lodash';

class LocationImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
    }

    async componentDidMount(){
            const imageResult = await fetch(`https://epic.gsfc.nasa.gov/api/natural`);
            console.log('image result => ', imageResult);
            const imageJson = await imageResult.json()
            console.log("TCL: LocationImage -> componentDidMount -> imageJson", imageJson)
            
            const firstElem = _.head(imageJson);
            this.setState({
                imageUrl: `https://epic.gsfc.nasa.gov/epic-archive/jpg/${firstElem.image}.jpg`,
                caption: firstElem.caption,
                datetimeOfPhoto: firstElem.date
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.imageUrl ?
                    <div>
                        <Image style={locationImageStyle} src={this.state.imageUrl} rounded fluid/>
                        <p>{this.state.caption} | {this.state.datetimeOfPhoto}</p>
                    </div>
                     :
                     <div style={loadingStyle}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                }
                
            </React.Fragment>
            
        )
    }   
}

const locationImageStyle = {
  width: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '10px',
  paddingBottom: '30px'
}

const loadingStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    display: 'flex'
}

const textStyle = {
  flex: '1',
  lineHeight: '1.2',
  fontSize: 'initial',
  padding: '10px'
}

export default LocationImage;