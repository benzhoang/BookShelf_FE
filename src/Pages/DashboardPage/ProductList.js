import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import EditListProduct from "../ModalListProduct/EditListProduct";
import {
  Table,
  Form,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";
import DeleteListProduct from "../ModalListProduct/DeleteListProduct";
import AddListProduct from "../ModalListProduct/AddListProduct";
import { bookServ } from "../../service/appService";

const ITEMS_PER_PAGE = 5;

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dataBook, setDataBook] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [quan, setQuan] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceSel, setTotalPriceSel] = useState(0);


  useEffect(() => {
    bookServ
      .getBook()
      .then((res) => {
        setDataBook(res.data);
        const totalSold = res.data.reduce((sum, book) => sum + (book.soldQuantity || 0), 0);
        const totalQuan = res.data.reduce((sum, book) => sum + (book.quantity || 0), 0);
        const totalPriceValue = res.data.reduce((sum, book) => {
          const price = parseFloat(book.price?.$numberDecimal || 0);
          return sum + (book.quantity * price);
        }, 0);
        const totalPriceSell = res.data.reduce((sum, book) => {
          const price = parseFloat(book.price?.$numberDecimal || 0);
          return sum + (book.soldQuantity * price);
        }, 0);
        setTotal(totalSold);
        setQuan(totalQuan);
        setTotalPrice(Math.round(totalPriceValue));
        setTotalPriceSel(Math.round(totalPriceSell));
      })
      .catch((err) => console.log(err));
  }, []);


  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  

  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleAdd = () => setShowAddModal(true);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleCloseAdd = () => setShowAddModal(false);

  // Pagination
  const totalPages = Math.ceil(dataBook.length / ITEMS_PER_PAGE);
  const displayedBooks = dataBook.slice(
    (curPage - 1) * ITEMS_PER_PAGE,
    curPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ backgroundColor: "#D3D3D3" }}>
      <Container style={{ height: "100vh", padding: "2%" }}>
        <Row className="mb-2 d-flex justify-content-between">
          <Col md={5}>
            <Card className="p-4 rounded-5 d-flex flex-row justify-content-between align-items-center">
              <Card.Body>
                <Card.Title>TỔNG ĐÃ BÁN</Card.Title>
                <Card.Text>{total} ~ ${totalPriceSel}K</Card.Text>
              </Card.Body>
              <HiOutlineShoppingBag size={80} color="green" />
            </Card>
          </Col>
          <Col md={5}>
            <Card className="p-4 rounded-5 d-flex flex-row justify-content-between align-items-center">
              <Card.Body>
                <Card.Title>TỔNG TỒN KHO</Card.Title>
                <Card.Text>{quan} ~ ${totalPrice}k</Card.Text>
              </Card.Body>
              <FaBoxOpen size={80} color="goldenrod" />
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header className="bg-success text-white">
            DANH SÁCH SẢN PHẨM
          </Card.Header>
          <Card.Body>
            <Form className="mb-3 d-flex align-items-center justify-content-between">
              <div className="position-relative w-25">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ps-5"
                />
                <BsSearch
                  className="position-absolute "
                  style={{
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
              <Button variant="info" className="px-4 ms-2" onClick={handleAdd}>
                Thêm
              </Button>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>STT</th>
                  <th>Tên Sách</th>
                  <th>Giá Bán</th>
                  <th>Tồn kho</th>
                  <th>Đã bán</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedBooks.map((product, index) => (
                  <tr key={product.id} className="text-center">
                    <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td>{product.bookName}</td>
                    <td>{product.price.$numberDecimal}$</td>
                    <td>{product.quantity}</td>
                    <td>{product.soldQuantity}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        variant="warning"
                        className="px-4"
                        onClick={() => handleEdit(product)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        className="px-4"
                        onClick={() => handleDelete(product)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="secondary"
                onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
                disabled={curPage === 1}
              >
                Trang trước
              </Button>
              <span className="mx-3">
                Trang {curPage} / {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() =>
                  setCurPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={curPage === totalPages}
              >
                Trang sau
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <EditListProduct
        show={showEditModal}
        handleClose={handleCloseEdit}
        book={selectedBook}
      />
      <DeleteListProduct
        show={showDeleteModal}
        handleClose={handleCloseDelete}
        book={selectedBook}
      />
      <AddListProduct show={showAddModal} handleClose={handleCloseAdd} />
    </div>
  );
};

export default ProductList;
