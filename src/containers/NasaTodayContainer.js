//packages
import React, { useState, useEffect } from 'react';
//app components
import NasaTodayModal from '../components/NasaTodayModal';


function NasaTodayContainer(props) {
  const [ready, setReady] = useState(false);
  const [todayDataOpen, setTodayDataOpen] = useState(false);
  const [data_date, setDataDate] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [title, setTitle] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaHdUrl, setMediaHdUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`,
      {
        method: "GET"
      }
    )
    .then(res => res.json())
    .then(response => {
      setReady(true);
      setTodayDataOpen(true);
      setDataDate(response.date);
      setTitle(response.title);
      setExplanation(response.explanation);
      setMediaUrl(response.url);
      setMediaHdUrl(response.hdurl);
      setMediaType(response.media_type);
    });
  });

    const { exitTodayData } = props;
    return (
      <div>
      {ready ?
        <NasaTodayModal
        title={title}
        mediaUrl={mediaUrl}
        mediaHdUrl={mediaHdUrl}
        mediaType={mediaType}
        explanation={explanation}
        todayDataOpen={todayDataOpen}
        exitTodayData={exitTodayData}/>
        : <p>loading...</p>}
      </div>
    );
}

export default NasaTodayContainer;
