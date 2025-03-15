import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./addAccount.css";
import { bookServ } from "../../service/appService";
const AddAccount = ({ show, handleClose, reloadData }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [error, setError] = useState("");

  const handleAddUser = () => {
    if (!userName || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const dataForm = {
      userName,
      email,
      password,
      role,
    };

    bookServ
      .registerUser(dataForm)
      .then((res) => {
        console.log("User added successfully:", res);
        setError("");
        handleClose();
        reloadData();
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        setError("Đã có lỗi xảy ra, vui lòng thử lại!");
      });
  };
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
        {error && <p className="text-danger text-center">{error}</p>}
        <Form>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Tên tài khoản"
              className="p-2 rounded-3 border-0"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="email"
              className="p-2 rounded-3 border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="password"
              className="p-2 rounded-3 border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 rounded-3 border-0"
            >
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <hr className="border-white hr-add" />
          <Button
            className="w-100 rounded-3 mb-5 my-4 btn-add"
            onClick={handleAddUser}
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAccount;
