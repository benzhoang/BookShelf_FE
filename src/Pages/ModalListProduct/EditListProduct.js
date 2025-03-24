import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./editListProduct.css";
import { bookServ } from "../../service/appService";

const EditListProduct = ({ show, handleClose, book }) => {
  const [formData, setFormData] = useState({
    bookName: "",
    price: "",
    description: "",
    quantity: "",
    actor: "",
    bookMedia: "",
    category: "",
    image: '',
  });



  const [mediaOptions, setMediaOptions] = useState([]);
  const [cate, setCate] = useState([]);
  const [actor, setActor] = useState([]);

  // Fetch danh sách bookMedia từ API
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await bookServ.getMedia();
        setMediaOptions(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bookMedia:", error);
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const res = await bookServ.getCate();
        setCate(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cate:", error);
      }
    };
    fetchCate();
  }, []);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await bookServ.getAc();
        setActor(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách actor:", error);
      }
    };
    fetchActor();
  }, []);

  useEffect(() => {
    if (book) {
      setFormData({
        bookName: book.bookName || "",
        image: book.image || "",
        price: book.price?.$numberDecimal || "",
        description: book.description || "",
        quantity: book.quantity || "",
        actor: book.actor.actorName || "",
        bookMedia: book.bookMedia.origin || "",
        category: book.category.categoryName || "",
      });
    }
  }, [book, actor, mediaOptions, cate]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "actor") {
      const foundActor = actor.find((ac) => ac._id === value);
      newValue = foundActor ? foundActor.actorName : value;
    } else if (name === "bookMedia") {
      const foundMedia = mediaOptions.find((media) => media._id === value);
      newValue = foundMedia ? foundMedia.origin : value;
    } else if (name === "category") {
      const foundCate = cate.find((c) => c._id === value);
      newValue = foundCate ? foundCate.categoryName : value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue, 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bookName: formData.bookName,
      description: formData.description,
      price: formData.price,
      categoryName: formData.category,
      actorName: formData.actor,
      origin: formData.bookMedia,
      quantity: formData.quantity,
      image: formData.image || 'no-art',
    };
    if (!book?._id) {
      console.error("Book ID is missing!");
      return;
    }

    try {
      const res = await bookServ.updateBook(book._id, data);
      console.log("Update success:", res.data);
      handleClose();
      window.location.reload()
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
        <h3 className="text-center text-white mb-4">Edit Book</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select
              name="actor"
              value={actor.find((ac) => ac.actorName === formData.actor)?._id || ""}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            >
              <option value="">Chọn tác giả</option>
              {actor.map((ac) => (
                <option key={ac._id} value={ac._id}>
                  {ac.actorName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select
              name="category"
              value={cate.find((c) => c.categoryName === formData.category)?._id || ""}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            >
              <option value="">Chọn thể loại</option>
              {cate.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Select
              name="bookMedia"
              value={mediaOptions.find((media) => media.origin === formData.bookMedia)?._id || ""}
              onChange={handleChange}
              className="p-2 rounded-3 border-0"
            >
              <option value="">Chọn nhà xuất bản</option>
              {mediaOptions.map((media) => (
                <option key={media._id} value={media._id}>
                  {media.origin}
                </option>
              ))}
            </Form.Select>
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
