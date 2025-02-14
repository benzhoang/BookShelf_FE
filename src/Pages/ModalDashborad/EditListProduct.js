import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./editListProduct.css";

const EditListProduct = ({ show, handleClose, book }) => {
  if (!book) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
      backdrop="static"
    >
      <Modal.Header
        closeButton
        className="border-0"
        style={{ backgroundColor: "#65c3a5" }}
      ></Modal.Header>
      <Modal.Body className="px-5 modal-body-custom">
        <h3 className="text-center text-white mb-4">Edit Book</h3>
        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              defaultValue={book.name}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              defaultValue={book.price}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={2}
              defaultValue={book.description}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              defaultValue={book.stock}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <hr className="border-white hr-edit" />
          <Button
            className="w-100 rounded-3 mb-5 my-4"
            style={{ backgroundColor: "gold", border: "none" }}
          >
            Edit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditListProduct;
