import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import DeleteAccount from "../ModalAccountList/DeleteAccount";
import AddAccount from "../ModalAccountList/AddAccount";
import EditAccount from "../ModalAccountList/EditAccount";
import { bookServ } from "../../service/appService";
import "./AccountList.css";

const ITEMS_PER_PAGE = 5;

const AccountList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [userData, setUserData] = useState([]);
  const [curPage, setCurPage] = useState(1);

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

  // Tính tổng số trang
  const totalPages = Math.ceil(userData.length / ITEMS_PER_PAGE);

  // Lọc dữ liệu hiển thị theo trang
  const displayedUsers = userData.slice(
    (curPage - 1) * ITEMS_PER_PAGE,
    curPage * ITEMS_PER_PAGE
  );

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleDelete = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  return (
    <div className="account-list-container">
      <Container className="py-4">
        <Card className="main-card">
          <Card.Header className="main-card-header">
            DANH SÁCH TÀI KHOẢN
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="search-container">
                <BsSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm tài khoản..."
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
                Thêm tài khoản
              </Button>
            </div>

            <div className="table-responsive">
              <Table className="account-table">
                <thead>
                  <tr>
                    <th width="5%">STT</th>
                    <th width="30%">Tên Tài Khoản</th>
                    <th width="35%">Email</th>
                    <th width="15%">Role</th>
                    <th width="15%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((account, index) => (
                    <tr key={`account-${account.id || index}`}>
                      <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="username">{account.userName}</td>
                      <td>{account.email}</td>
                      <td className="role">{account.role}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-warning"
                            className="edit-button"
                            onClick={() => handleEdit(account)}
                          >
                            Sửa
                          </Button>
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

      {/* Modals */}
      <EditAccount
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        account={selectedAccount}
      />
      <DeleteAccount
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        account={selectedAccount}
      />
      <AddAccount
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default AccountList;
