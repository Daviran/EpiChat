import React from 'react';
import { Toast, ToastContainer} from "react-bootstrap";

export default

class Chat extends React.Component {
  
    render() {

        return (
<ToastContainer>
  <Toast>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      <strong className="me-auto">Auteur</strong>
      <small className="text-muted">Date</small>
    </Toast.Header>
    <Toast.Body>Idée de chat ? </Toast.Body>
  </Toast>
  <Toast>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      <strong className="me-auto">Auteur</strong>
      <small className="text-muted">Date</small>
    </Toast.Header>
    <Toast.Body>à voir avec irc. </Toast.Body>
  </Toast>
</ToastContainer>
        )
    }
    
  }