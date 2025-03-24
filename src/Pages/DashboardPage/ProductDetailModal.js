import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ProductDetailModal.css"; // Import file CSS

const ProductDetailModal = ({ show, handleClose, book }) => {
  if (!book) return null;

  const handleDownloadQRCode = async () => {
    if (!book.qrCode || !book._id) return;
  
    try {
      const response = await fetch(book.qrCode);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `QRCode_${book._id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Giải phóng bộ nhớ
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi tải ảnh QR:", error);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered className="product-modal">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-info">
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <img src={book.image} alt="Book" className="product-image" />
            </div>
            <div className="product-details">
              <p><strong>Tên Sách:</strong> {book.bookName}</p>
              <p><strong>Giá Bán:</strong> {book.price?.$numberDecimal}$</p>
              <p><strong>Tồn Kho:</strong> {book.quantity}</p>
              <p><strong>Đã Bán:</strong> {book.soldQuantity}</p>
              <p><strong>Mô Tả:</strong> {book.description || "Không có mô tả"}</p>
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "3%" }}>
            <div className="product-details" style={{ marginTop: "3%" }}>
              <p><strong>Tác Giả:</strong> {book.actor?.actorName || "Không có tác giả"}</p>
              <p><strong>Thể Loại:</strong> {book.category?.categoryName || "Không có thể loại"}</p>
              <p><strong>Xuất Bản:</strong> {book.bookMedia?.origin || "Không có thông tin xuất bản"}</p>
              <button
                style={{
                  border: "none",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer"
                }}
                onClick={handleDownloadQRCode} // Gọi hàm tải file khi bấm
              >
                Xuất File
              </button>
            </div>
            <div style={{ width: "50%" }}>
              <img src={book.qrCode} alt="QR Code" className="qr-code" />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailModal;
