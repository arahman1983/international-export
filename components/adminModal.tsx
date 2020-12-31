import { Modal } from 'react-bootstrap'

export default function AdminModal({ show, handleClose, FormComponent, formTitle,  ...props }) {
  return (
    <Modal show={show} onHide={handleClose} {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { FormComponent }
      </Modal.Body>
    </Modal>
  )
}