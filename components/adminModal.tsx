import { Modal, Button} from 'react-bootstrap'
import useTranslation from '../locals/localHook'

export default function AdminModal({ show, handleClose, ...props }) {
  const { t } = useTranslation()
  return (
    <Modal show={show} onHide={handleClose} {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}