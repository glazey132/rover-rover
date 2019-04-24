import React, {Component} from 'react';
import Image from 'react-bootstrap/Image';

class LocationImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null
        }
    }

    async componentDidMount(){
        if (this.props.coords) {
            const imageResult = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
            const imageJson = await imageResult.json()
            this.setState({
                imageUrl: imageJson.url
            })
        }
    }

    render() {
        return (
            <Image style={locationImageStyle} src={this.state.imageUrl} rounded fluid/>
        )
    }   
}

const locationImageStyle = {
  height: '20rem',
  width: '100%',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '10px',
  paddingBottom: '30px'
}

const textStyle = {
  flex: '1',
  lineHeight: '1.2',
  fontSize: 'initial',
  padding: '10px'
}

export default LocationImage;