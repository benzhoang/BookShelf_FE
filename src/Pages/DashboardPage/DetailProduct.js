import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

const DetailProduct = ({ show, handleClose, book }) => {
  if (!book) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div
          style={{
            display: "flex",
          }}
        >
          <Image
            src={book.image}
            alt={book.bookName}
            className="mb-3 rounded"
            style={{ width: '200px', height: "auto" }}
          />
          <div style={{ textAlign: "left" }}>
            <p>
              <strong>Tên sách:</strong> {book.bookName}
            </p>
            <p>
              <strong>Chi tiết:</strong> {book.description}
            </p>
            <p>
              <strong>Giá:</strong> {book.price.$numberDecimal}$
            </p>
            <p>
              <strong>Tồn kho:</strong> {book.quantity}
            </p>
            <p>
              <strong>Đã bán:</strong> {book.soldQuantity}
            </p>
          </div>
        </div>

        <div className="mt-3" style={{display: 'flex', textAlign:'left',padding: '0 0 0 9%'}}>
          <div>
            <p>
              <strong>Tác giả:</strong> {book.actor.actorName || ""}
            </p>
            <p>
              <strong>Thể loại:</strong> {book.category.categoryName}
            </p>
            <p>
              <strong>Nhà xuất bản</strong> {book.bookMedia.origin}
            </p>
            {book.available && (
              <p>
                <strong>Đang bán</strong> 
              </p>
            )}
            {!book.available && (
              <p>
                <strong>Tạm ngưng bán</strong> 
              </p>
            )}
            
          </div>
          <div style={{ textAlign: 'right', width: '50%'}}>
            <span>Qr code</span> <br />
            <Image
              src={book.qrCode}
              alt="QR Code"
              className="rounded"
              style={{ width: "150px", height: "150px" }}
            />
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

export default DetailProduct;
