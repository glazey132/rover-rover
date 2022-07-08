import React from 'react';
import Notification from './Notification';

const NotificationSection = props => (
    <section style={notificationSectionStyle}>
      <h4>Latest Notification</h4>
      <Notification text={props.notification.messageBody}/>
    </section>
);

const notificationSectionStyle = {
  fontSize: 'calc(8px + .5em)',
  color: 'black',
  paddingLeft: '10px'
}

export default NotificationSection;
