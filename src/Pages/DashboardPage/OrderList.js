import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import EditOrderList from "../ModalOrderList/EditOrderList";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import DeleteOrderList from "../ModalOrderList/DeleteOrderList";
import AddOrderList from "../ModalOrderList/AddOrderList";
import DetailOrderList from "../ModalOrderList/DetailOrderList";

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1,
      code: "ORD001",
      employeeId: "EMP101",
      saleDate: "2024-02-10",
    },
    {
      id: 2,
      code: "ORD002",
      employeeId: "EMP102",
      saleDate: "2024-02-11",
    },
    {
      id: 3,
      code: "ORD003",
      employeeId: "EMP103",
      saleDate: "2024-02-12",
    },
    {
      id: 4,
      code: "ORD004",
      employeeId: "EMP104",
      saleDate: "2024-02-13",
    },
    {
      id: 5,
      code: "ORD005",
      employeeId: "EMP105",
      saleDate: "2024-02-14",
    },
  ];

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3", height: "100vh" }}>
      <Container fluid className="p-5">
        <Card>
          <Card.Header className="bg-success text-white">
            DANH SÁCH ĐƠN HÀNG
          </Card.Header>
          <Card.Body>
            <Form className="mb-3 d-flex align-items-center justify-content-between">
              <div className="position-relative w-25">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm mã đơn hàng..."
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
              <div>
                <Button
                  variant="info"
                  className="px-4 ms-2"
                  onClick={handleAdd}
                >
                  Thêm
                </Button>
              </div>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Mã Đơn Hàng</th>
                  <th>Mã Nhân Viên</th>
                  <th>Ngày Bán</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) =>
                    order.code.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id} className="text-center">
                      <td>{order.id}</td>
                      <td>{order.code}</td>
                      <td>{order.employeeId}</td>
                      <td>{order.saleDate}</td>
                      <td className="d-flex justify-content-around">
                        <Button
                          variant="warning"
                          style={{ width: "93px", padding: "10px" }}
                          onClick={() => handleEdit(order)}
                        >
                          Sửa
                        </Button>
                        <Button
                          style={{ width: "93px", padding: "10px" }}
                          variant="danger"
                          onClick={() => handleDelete(order)}
                        >
                          Xóa
                        </Button>
                        <Button
                          style={{ width: "93px", padding: "10px" }}
                          variant="secondary"
                          onClick={() => handleDetail(order)}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <EditOrderList
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        order={selectedOrder}
      />
      <DeleteOrderList
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        order={selectedOrder}
      />
      <AddOrderList
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <DetailOrderList
        show={showDetailModal}
        handleClose={() => setShowDetailModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
