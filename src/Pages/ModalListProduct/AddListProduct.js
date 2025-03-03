import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./addListProduct.css";
import { bookServ } from "../../service/appService";

const AddListProduct = ({ show, handleClose }) => {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [actorName, setActorName] = useState("");
  const [origin, setOrigin] = useState("");
  const [imageUrls, setImageUrls] = useState("");

  const onFinish = (event) => {
    event.preventDefault(); // Prevents form from refreshing the page
    const  dataForm = {
      bookName,
      description,
      price: Number(price),
      categoryName,
      actorName,
      origin,
      imageUrls: []
    }
    console.log(dataForm)
    bookServ.postBook(dataForm)
      .then((res) => {
        console.log(res.data)
        window.location.reload()
      })
      .catch((err)=>{
        console.log(err)
      })
    // You can now send this data to an API
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
        <h3 className="text-center text-white mb-4">Add Book</h3>
        <Form onSubmit={onFinish}>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Book Name"
              className="p-2 rounded-3 border-0"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Price"
              className="p-2 rounded-3 border-0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Description"
              className="p-2 rounded-3 border-0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="categoryName"
              className="p-2 rounded-3 border-0"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="actorName"
              className="p-2 rounded-3 border-0"
              value={actorName}
              onChange={(e) => setActorName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="origin"
              className="p-2 rounded-3 border-0"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Form.Group>
          <hr className="border-white hr-add" />
          <Button type="submit" className="w-100 rounded-3 mb-5 my-4 btn-add">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddListProduct;
