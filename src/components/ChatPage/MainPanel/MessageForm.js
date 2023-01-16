import React from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MessageForm() {
  return (
    <div>
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
      />
      <ProgressBar
        variant="waring"
        label="60%"
        now={60}
        style={{ marginTop: '10px' }}
      />
      <Row>
        <Col>
          <button className="message-form-button" style={{ width: '100%' }}>
            SEND
          </button>
        </Col>
        <Col>
          <button className="message-form-button" style={{ width: '100%' }}>
            UPLOAD
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
