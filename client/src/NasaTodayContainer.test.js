import React from 'react';
import ReactDOM from 'react-dom';
import NasaTodayContainer from './containers/NasaTodayContainer';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NasaTodayContainer />, div)
  ReactDOM.unmountComponentAtNode(div);
});

it('calling the nasa api for 2019-02-14 sets the state as expected', () => {
  let state = {};
  fetch(`https://api.nasa.gov/planetary/apod?date=2019-02-14&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
  .then(resp => {
    state = {
      date: resp.date,
      title: resp.title,
      mediaType: resp.mediaType,
      imageUrl: resp.url,
      explanation: resp.explanation
    }
  })
})
