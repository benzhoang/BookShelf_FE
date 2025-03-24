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
import "./ProductList.css";
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
        const totalSold = res.data.reduce(
          (sum, book) => sum + (book.soldQuantity || 0),
          0
        );
        const totalQuan = res.data.reduce(
          (sum, book) => sum + (book.quantity || 0),
          0
        );
        const totalPriceValue = res.data.reduce((sum, book) => {
          const price = parseFloat(book.price?.$numberDecimal || 0);
          return sum + book.quantity * price;
        }, 0);
        const totalPriceSell = res.data.reduce((sum, book) => {
          const price = parseFloat(book.price?.$numberDecimal || 0);
          return sum + book.soldQuantity * price;
        }, 0);
        setTotal(totalSold);
        setQuan(totalQuan);
        setTotalPrice(Math.round(totalPriceValue));
        setTotalPriceSel(Math.round(totalPriceSell));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(total, quan);

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
    <div className="product-list-container">
      <Container className="py-4">
        <Row className="mb-4 stats-cards">
          <Col lg={6} md={6} className="mb-3">
            <Card className="stats-card sales-card">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="stats-title">TỔNG ĐÃ BÁN</Card.Title>
                  <Card.Text className="stats-value">
                    {total}{" "}
                    <span className="stats-unit">~ ${totalPriceSel}K</span>
                  </Card.Text>
                </div>
                <div className="stats-icon">
                  <HiOutlineShoppingBag size={70} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Card className="stats-card inventory-card">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="stats-title">TỔNG TỒN KHO</Card.Title>
                  <Card.Text className="stats-value">
                    {quan} <span className="stats-unit">~ ${totalPrice}k</span>
                  </Card.Text>
                </div>
                <div className="stats-icon">
                  <FaBoxOpen size={70} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="main-card">
          <Card.Header className="main-card-header">
            DANH SÁCH SẢN PHẨM
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="search-container">
                <BsSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <Button
                variant="primary"
                className="add-button"
                onClick={handleAdd}
              >
                Thêm sách
              </Button>
            </div>

            <div className="table-responsive">
              <Table className="product-table">
                <thead>
                  <tr>
                    <th width="5%">STT</th>
                    <th width="30%">Tên Sách</th>
                    <th width="15%">Giá Bán</th>
                    <th width="15%">Tồn kho</th>
                    <th width="15%">Đã bán</th>
                    <th width="20%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBooks.map((product, index) => (
                    <tr key={`product-${product._id || index}`}>
                      <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="book-title">{product.bookName}</td>
                      <td className="price">${product.price.$numberDecimal}</td>
                      <td>{product.quantity}</td>
                      <td>{product.soldQuantity}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-warning"
                            className="edit-button"
                            onClick={() => handleEdit(product)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="delete-button"
                            onClick={() => handleDelete(product)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
              <Button
                variant="outline-secondary"
                onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
                disabled={curPage === 1}
                className="pagination-button"
              >
                &laquo; Trang trước
              </Button>
              <div className="pagination-info">
                Trang {curPage} / {totalPages}
              </div>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setCurPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={curPage === totalPages}
                className="pagination-button"
              >
                Trang sau &raquo;
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
