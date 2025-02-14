import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import DeleteAccount from "../ModalAccountList/DeleteAccount";
import AddAccount from "../ModalAccountList/AddAccount";
import EditAccount from "../ModalAccountList/EditAccount";

const AccountList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const accounts = [
    {
      id: 1,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
    },
    {
      id: 2,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
    },
    {
      id: 3,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
    },
    {
      id: 4,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
    },
    {
      id: 5,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
    },
    {
      id: 6,
      accountName: "lehaiha",
      email: "haiha@gmail.com",
      password: "123",
      phoneNumber: "0333915630",
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

  return (
    <div style={{ backgroundColor: "#D3D3D3" }}>
      <Container fluid className="p-5">
        <Card>
          <Card.Header className="bg-success text-white">
            DANH SÁCH TÀI KHOẢN
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
                  <th>Tên Tài Khoản</th>
                  <th>Email</th>
                  <th>PhoneNumber</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts
                  .filter((account) =>
                    account.accountName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((account) => (
                    <tr key={account.id} className="text-center">
                      <td>{account.id}</td>
                      <td>{account.accountName}</td>
                      <td>{account.email}</td>
                      <td>{account.phoneNumber}</td>
                      <td className="d-flex justify-content-around">
                        <Button
                          variant="warning"
                          style={{ width: "93px", padding: "10px" }}
                          onClick={() => handleEdit(account)}
                        >
                          Sửa
                        </Button>
                        <Button
                          style={{ width: "93px", padding: "10px" }}
                          variant="danger"
                          onClick={() => handleDelete(account)}
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
      <EditAccount
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        account={selectedOrder}
      />
      <DeleteAccount
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        account={selectedOrder}
      />
      <AddAccount
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default AccountList;
