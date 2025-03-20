import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./addListProduct.css";
import { bookServ } from "../../service/appService";
import axios from "axios";

const AddListProduct = ({ show, handleClose }) => {
  const navigate = useNavigate(); // Hook điều hướng
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [actorName, setActorName] = useState("");
  const [origin, setOrigin] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [cate, setCate] = useState([]);
  const [actor, setActor] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCate, resActor, resOrigin] = await Promise.all([
          bookServ.getCate(),
          bookServ.getAc(),
          bookServ.getMedia(),
        ]);
        setCate(resCate.data || []);
        setActor(resActor.data || []);
        setOrigins(resOrigin.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    try {
      const res = await axios.post("https://bookshelf-be.onrender.com/api/uploadImg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrls(res.data.imageUrls || []);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    } finally {
      setUploading(false);
    }
  };

  const onFinish = (event) => {
    event.preventDefault();
    const dataForm = {
      bookName,
      description,
      price: Number(price),
      categoryName,
      actorName,
      origin,
      imageUrls,
    };

    bookServ
      .postBook(dataForm)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: "#65c3a5" }}></Modal.Header>
      <Modal.Body className="px-5">
        <h3 className="text-center text-white mb-4">Add Book</h3>
        <Form onSubmit={onFinish}>
          <Form.Group className="mb-4">
            <Form.Control type="text" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control as="textarea" rows={2} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          {/* Select Category với nút View */}
          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                  <option value="">Select Category</option>
                  {cate.map((item) => (
                    <option key={item.id} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/categories")}>
                  View
                </Button>
              </Col>
            </Row>
          </Form.Group>

          {/* Select Actor với nút View */}
          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={actorName} onChange={(e) => setActorName(e.target.value)}>
                  <option value="">Select Actor</option>
                  {actor.map((item) => (
                    <option key={item.id} value={item.actorName}>
                      {item.actorName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/actors")}>
                  View
                </Button>
              </Col>
            </Row>
          </Form.Group>

          {/* Select Origin với nút View */}
          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  <option value="">Select Origin</option>
                  {origins.map((item) => (
                    <option key={item.id} value={item.origin}>
                      {item.origin}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/origins")}>
                  View
                </Button>
              </Col>
            </Row>
          </Form.Group>

          {/* Upload hình ảnh */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Upload Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageUpload} />
          </Form.Group>

          {/* Hiển thị ảnh đã upload */}
          <div className="uploaded-images">
            {uploading && <p className="text-white">Uploading...</p>}
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt="Book" width="100" height="100" className="me-2" />
            ))}
          </div>

          <hr className="border-white" />
          <Button type="submit" className="w-100 rounded-3 my-4 btn-add">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddListProduct;
