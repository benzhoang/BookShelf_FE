import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./addAccount.css";

const AddAccount = ({ show, handleClose }) => {
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
        <h3 className="text-center text-white mb-4">Thêm tài khoản</h3>
        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Tên tài khoản"
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="email"
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="phoneNumber"
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <hr className="border-white hr-add" />
          <Button className="w-100 rounded-3 mb-5 my-4 btn-add">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAccount;
