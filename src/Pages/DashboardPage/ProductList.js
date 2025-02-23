import React, { useState } from "react";
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

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const products = [
    {
      id: 1,
      code: "001",
      name: "Thanh Gươm ",
      price: "99.000đ",
      sold: 21,
      stock: 125,
      description: "Một câu chuyện hấp dẫn...",
    },
    {
      id: 2,
      code: "002",
      name: "Thanh Gươm Diệt Quỷ",
      price: "99.000đ",
      sold: 21,
      stock: 125,
      description: "Một câu chuyện hấp dẫn...",
    },
    {
      id: 3,
      code: "003",
      name: "Thanh Gươm Diệt Quỷ",
      price: "99.000đ",
      sold: 21,
      stock: 125,
      description: "Một câu chuyện hấp dẫn...",
    },
    {
      id: 4,
      code: "004",
      name: "Thanh Gươm Diệt Quỷ",
      price: "99.000đ",
      sold: 108,
      stock: 20,
      description: "Một câu chuyện hấp dẫn...",
    },
    {
      id: 5,
      code: "005",
      name: "Thanh Gươm Diệt Quỷ",
      price: "99.000đ",
      sold: 2,
      stock: 83,
      description: "Một câu chuyện hấp dẫn...",
    }
  ];
  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };
  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedBook(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedBook(null);
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3" }}>
      <Container fluid className=" p-5">
        <Row className="mb-3 d-flex justify-content-between">
          <Col md={5}>
            <Card className="p-3 rounded-5 d-flex flex-row justify-content-between align-items-center">
              <Card.Body>
                <Card.Title>TỔNG ĐÃ BÁN</Card.Title>
                <Card.Text>200 ~ $860.25K</Card.Text>
              </Card.Body>
              <HiOutlineShoppingBag size={80} color="green" />
            </Card>
          </Col>
          <Col md={5}>
            <Card className="p-3 rounded-5 d-flex flex-row justify-content-between align-items-center">
              <Card.Body>
                <Card.Title>TỔNG TỒN KHO</Card.Title>
                <Card.Text>522 ~ $560.25K</Card.Text>
              </Card.Body>{" "}
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
                  className="ps-5" // Dịch chữ vào bên phải để không bị đè lên icon
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
              <div>
                <Button
                  variant="info"
                  className="px-4 ms-2"
                  onClick={() => handleAdd()}
                >
                  Thêm
                </Button>
              </div>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Mã Sách</th>
                  <th>Tên Sách</th>
                  <th>Giá Bán</th>
                  <th>Đã Bán</th>
                  <th>Tồn kho</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <tr key={product.id} className="text-center">
                      <td>{product.id}</td>
                      <td>{product.code}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.sold}</td>
                      <td>{product.stock}</td>
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
