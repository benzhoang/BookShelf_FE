import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./editListProduct.css";
import { bookServ, orderServ } from "../../service/appService";

const EditListProduct = ({ show, handleClose, order }) => {
  const [formData, setFormData] = useState({
    userName: "",
    payStatus: "",
    paymentID: "",
    totalPrice: "",
    createAt: "",
    updateAt: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        userName: order.userID?.userName || "Nhân viên đã nghỉ làm",
        payStatus: order.payStatus || "",
        paymentID: order.paymentID || "",
        totalPrice: order.totalPrice || "",
        createAt: order.createAt || "",
        updateAt: order.updateAt || "",
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order?._id) {
      console.error("Order ID is missing!");
      return;
    }

    try {
      const data = {
        totalPrice: formData.totalPrice,
        payStatus: formData.payStatus
      }
      console.log(data)
      await bookServ.updateOrder(order._id, data);
      console.log("Update success");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
    }
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
        <h3 className="text-center text-white mb-4">
          Edit Order: {order?._id}
        </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <label>Nhân Viên</label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <label>Trạng Thái</label>
            <Form.Select
              name="payStatus"
              value={formData.payStatus}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            >
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <label>Giá Tiền</label>
            <Form.Control
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <label>Ngày Tạo</label>
            <Form.Control
              type="text"
              name="createAt"
              value={new Date(order?.createdAt).toLocaleDateString("vi-VN")}
              disabled
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <hr className="border-white hr-edit" />
          <Button
            type="submit"
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
