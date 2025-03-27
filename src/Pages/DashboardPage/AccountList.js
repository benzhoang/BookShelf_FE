import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import DeleteAccount from "../ModalAccountList/DeleteAccount";
import { bookServ } from "../../service/appService";
import "./AccountList.css";

const ITEMS_PER_PAGE = 5;

const AccountList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userData, setUserData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState(""); // Lọc theo role

  useEffect(() => {
    bookServ
      .getAllUser()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Lọc theo tìm kiếm + role
  const filteredUsers = userData
    .filter(
      (user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (filterRole ? user.role === filterRole : true));

  // Sắp xếp theo role
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortOrder === "asc"
      ? a.role.localeCompare(b.role)
      : b.role.localeCompare(a.role);
  });

  // Tổng số trang
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE) || 1;

  // Dữ liệu hiển thị theo trang
  const displayedUsers = sortedUsers.slice(
    (curPage - 1) * ITEMS_PER_PAGE,
    curPage * ITEMS_PER_PAGE
  );

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  return (
    <div className="account-list-container">
      <Container>
        <Card className="main-card">
          <Card.Header className="main-card-header">
            DANH SÁCH TÀI KHOẢN
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4 ">
              <div className="search-container">
                <BsSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm tài khoản..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurPage(1);
                  }}
                  className="search-input"
                />
              </div>

              {/* Bộ lọc role */}
              <div>
                <Form.Select
                  value={filterRole}
                  onChange={(e) => {
                    setFilterRole(e.target.value);
                    setCurPage(1);
                  }}
                  className="role-filter"
                >
                  <option value="">Tất cả vai trò</option>
                  {[...new Set(userData.map((user) => user.role))].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <div className="table-responsive">
              <Table className="account-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Tài Khoản</th>
                    <th>Email</th>
                    <th
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      style={{ cursor: "pointer" }}
                    >
                      Role {sortOrder === "asc" ? "▲" : "▼"}
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.length > 0 ? (
                    displayedUsers.map((account, index) => (
                      <tr key={account.id}>
                        <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td className="username">{account.userName}</td>
                        <td>{account.email}</td>
                        <td className="role">{account.role}</td>
                        <td>
                          <div className="action-buttons">
                            <Button
                              variant="outline-danger"
                              className="delete-button"
                              onClick={() => handleDelete(account)}
                            >
                              Xóa
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Không tìm thấy tài khoản nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
              <Button
                className="pagination-button"
                onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
                disabled={curPage === 1}
              >
                Trang trước
              </Button>
              <div className="pagination-info">
                Trang {curPage} / {totalPages}
              </div>
              <Button
                className="pagination-button"
                onClick={() => setCurPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={curPage === totalPages || totalPages === 0}
              >
                Trang sau
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <DeleteAccount
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        account={selectedOrder}
      />
    </div>
  );
};

export default AccountList;
