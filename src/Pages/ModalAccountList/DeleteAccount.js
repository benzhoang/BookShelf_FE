import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./deleteAccount.css";
const DeleteListProduct = ({ show, handleClose, order }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton className="modal-custom">
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-custom">
        Are you sure you want to delete?
      </Modal.Body>
      <Modal.Footer className="modal-custom">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="btn-cancel mr-4"
        >
          Cancel
        </Button>
        <Button variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteListProduct;
