import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./deleteAccount.css";
import { bookServ } from "../../service/appService";
const DeleteListProduct = ({ show, handleClose, account }) => {
  console.log(account)
  const handleDelete = async () => {
      console.log(account._id)
      if (!account?._id){
        console.log(account._id)
      };
      try {
        await bookServ.deleteAccout(account._id); // Gọi hàm deleteBook được truyền từ props
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
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-custom">
        Are you sure you want to delete?
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
