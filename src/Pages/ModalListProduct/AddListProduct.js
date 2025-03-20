import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./addListProduct.css";
import { bookServ } from "../../service/appService";
import axios from "axios";

const AddListProduct = ({ show, handleClose }) => {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [actorName, setActorName] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]); // Lưu trữ file ảnh
  const [cate, setCate] = useState([]);
  const [actor, setActor] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // Để hiển thị preview ảnh

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

  // Hàm xử lý khi chọn ảnh
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    // Lưu các file ảnh để upload sau
    setImages(Array.from(files));

    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previewUrls);
  };

  const onFinish = async (event) => {
    event.preventDefault();
    setUploading(true);

    try {
      if (
        !bookName ||
        !price ||
        !categoryName ||
        !actorName ||
        !origin ||
        !quantity ||
        images.length === 0
      ) {
        setUploading(false);
        return;
      }

      // Lấy token từ localStorage
      const token = localStorage.getItem("ACCESS_TOKEN");

      if (!token) {
        alert(
          "Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!"
        );
        setUploading(false);
        return;
      }

      // Tạo FormData object để gửi dữ liệu
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("quantity", Number(quantity));
      formData.append("categoryName", categoryName);
      formData.append("actorName", actorName);
      formData.append("origin", origin);

      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }

      // Kiểm tra xem FormData có dữ liệu không
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Gửi request đến API
      const response = await axios.post(
        "https://bookshelf-be.onrender.com/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 60000,
        }
      );

      console.log("Thêm sách thành công:", response.data);
      alert("Thêm sách thành công!");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);

      if (error.response) {
        console.error("Chi tiết lỗi:", error.response.data);
        alert(
          `Lỗi: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );

        if (error.response.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
          localStorage.removeItem("USER_INFO");
          window.location.href = "/";
        }
      } else {
        alert(`Lỗi: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#65c3a5" }}
      ></Modal.Header>
      <Modal.Body className="px-5" style={{ backgroundColor: "#65c3a5" }}>
        <h3 className="text-center text-white mb-4">Add Book</h3>
        <Form onSubmit={onFinish}>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {cate.map((item) => (
                <option key={item.id || item._id} value={item.categoryName}>
                  {item.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              value={actorName}
              onChange={(e) => setActorName(e.target.value)}
              required
            >
              <option value="">Select Actor</option>
              {actor.map((item) => (
                <option key={item.id || item._id} value={item.actorName}>
                  {item.actorName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            >
              <option value="">Select Origin</option>
              {origins.map((item) => (
                <option key={item.id || item._id} value={item.origin}>
                  {item.origin}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group>

          {/* Upload hình ảnh */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Upload Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          {/* Hiển thị ảnh preview */}
          <div className="uploaded-images">
            {uploading && <p className="text-white">Đang gửi dữ liệu...</p>}
            {previewImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Book Preview"
                width="120"
                height="120"
                className="preview-image"
              />
            ))}
          </div>

          <hr className="border-white" />
          <Button
            type="submit"
            className="w-100 rounded-3 my-4 btn-add"
            disabled={uploading}
          >
            {uploading ? "Đang thêm sách..." : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddListProduct;
