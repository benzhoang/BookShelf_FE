import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./addListProduct.css";
import { bookServ } from "../../service/appService";

const AddListProduct = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [actorName, setActorName] = useState("");
  const [origin, setOrigin] = useState("");
  const [image, setImage] = useState(null); // Lưu ảnh dưới dạng base64
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

  // Chuyển file ảnh thành base64
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); // Lưu ảnh dưới dạng base64
      };
    }
  };

  const onFinish = async (event) => {
    event.preventDefault();
  
    if (!bookName || !description || !categoryName || !actorName || !origin || !image) {
      alert("Vui lòng điền đầy đủ thông tin và chọn ảnh!");
      return;
    }
  
    const data = {
      bookName,
      description,
      price: Number(price),
      quantity: Number(quantity),
      categoryName,
      actorName,
      origin,
      image, // Base64
    };
  
    console.log("Data sent to API:", data);
  
    try {
      setUploading(true);
      const res = await bookServ.postBook(data); 
      console.log("Response:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi thêm sách:", err);
      alert("Thêm sách thất bại! Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: "#65c3a5" }}></Modal.Header>
      <Modal.Body className="px-5">
        <h3 className="text-center text-white mb-4">Add Book</h3>
        <Form onSubmit={onFinish}>
          <Form.Group className="mb-4">
            <Form.Control type="text" placeholder="Book Name *" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control type="number" placeholder="Price *" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control as="textarea" rows={2} placeholder="Description *" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
                  <option value="">Select Category *</option>
                  {cate.map((item) => (
                    <option key={item.id} value={item.categoryName}>
                      {item.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/categories")}>View</Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={actorName} onChange={(e) => setActorName(e.target.value)} required>
                  <option value="">Select Actor *</option>
                  {actor.map((item) => (
                    <option key={item.id} value={item.actorName}>
                      {item.actorName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/actors")}>View</Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-4">
            <Row>
              <Col xs={9}>
                <Form.Select value={origin} onChange={(e) => setOrigin(e.target.value)} required>
                  <option value="">Select Origin *</option>
                  {origins.map((item) => (
                    <option key={item.id} value={item.origin}>
                      {item.origin}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={3}>
                <Button variant="info" className="w-100" onClick={() => navigate("/origins")}>View</Button>
              </Col>
            </Row>
          </Form.Group>

          {/* Upload hình ảnh */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={onFileChange} />
          </Form.Group>

          <hr className="border-white" />
          <Button type="submit" className="w-100 rounded-3 my-4 btn-add" disabled={uploading}>
            {uploading ? "Adding..." : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddListProduct;
