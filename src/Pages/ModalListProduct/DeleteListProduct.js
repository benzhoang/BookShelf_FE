import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./deleteListProduct.css";
import { bookServ } from "../../service/appService";
const DeleteListProduct = ({ show, handleClose, book }) => {
  const handleDelete = async () => {
    console.log(book._id)
    if (!book?._id){
      console.log(book._id)
    };
    try {
      await bookServ.deleteBook(book._id); // Gọi hàm deleteBook được truyền từ props
      alert("Xóa sách thành công!");
      window.location.reload()
      handleClose(); // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      alert("Xóa thất bại! Hãy thử lại.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton className="modal-custom">
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-custom">
        Are you sure you want to delete? <strong>{book?.name}</strong> không?
      </Modal.Body>
      <Modal.Footer className="modal-custom">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="btn-cancel mr-4"
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteListProduct;
