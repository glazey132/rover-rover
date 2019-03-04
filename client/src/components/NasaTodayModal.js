//packages
import React from 'react';

// app components
import NasaTodayText from './NasaTodayText';
import NasaTodayMedia from './NasaTodayMedia';

//bootstrap components
import Modal from 'react-bootstrap/Modal';

const NasaTodayModal = props => {
  const { todayDataOpen, exitTodayData, title, explanation, mediaUrl, mediaHdUrl, mediaType } = props;
  return (
    <Modal
      size="lg"
      show={todayDataOpen}
      onHide={exitTodayData}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalBodyStyle}>
        <NasaTodayMedia style={modalItemStyle} mediaUrl={mediaUrl} mediaHdUrl={mediaHdUrl} mediaType={mediaType}/>
        <NasaTodayText style={modalItemStyle} explanation={explanation} />
      </Modal.Body>
    </Modal>
  )
}

const modalBodyStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const modalItemStyle = {
  flex: '1'
}

export default NasaTodayModal;
