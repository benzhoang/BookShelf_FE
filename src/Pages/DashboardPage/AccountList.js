import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Table, Form, Container, Button, Card, Spinner } from "react-bootstrap";
import DeleteAccount from "../ModalAccountList/DeleteAccount";
import AddAccount from "../ModalAccountList/AddAccount";
import EditAccount from "../ModalAccountList/EditAccount";
import { bookServ } from "../../service/appService";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5; // Mỗi trang hiển thị 5 dòng

const AccountList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userData, setUserData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    bookServ
      .getAllUser()
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Tính tổng số trang
  const totalPages = Math.ceil(userData.length / ITEMS_PER_PAGE);

  // Lọc dữ liệu hiển thị theo trang
  const displayedUsers = userData.slice(
    (curPage - 1) * ITEMS_PER_PAGE,
    curPage * ITEMS_PER_PAGE
  );

  // Xử lý chuyển trang
  const handleNextPage = () => {
    if (curPage < totalPages) setCurPage(curPage + 1);
  };

  const handlePrevPage = () => {
    if (curPage > 1) setCurPage(curPage - 1);
  };

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
    <div style={{ backgroundColor: "#D3D3D3", height: "100vh" }}>
      <Container fluid className="p-5">
        <Card>
          <Card.Header className="bg-success text-white">
            DANH SÁCH TÀI KHOẢN
          </Card.Header>
          <Card.Body>
            {loading ? (
              // Hiển thị spinner khi đang tải dữ liệu
              <div
                className="d-flex justify-content-center align-items-center "
                style={{ height: "300px" }}
              >
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Đang tải dữ liệu...</span>
              </div>
            ) : (
              <>
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
                      <th>STT</th>
                      <th>Tên Tài Khoản</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUsers.map((account, index) => (
                      <tr key={account.id} className="text-center">
                        <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>{" "}
                        {/* STT tăng dần */}
                        <td>{account.userName}</td>
                        <td>{account.email}</td>
                        <td>{account.role}</td>
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

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="primary"
                    onClick={handlePrevPage}
                    disabled={curPage === 1}
                  >
                    ← Previous
                  </Button>
                  <span>
                    Trang {curPage} / {totalPages}
                  </span>
                  <Button
                    variant="primary"
                    onClick={handleNextPage}
                    disabled={curPage === totalPages}
                  >
                    Next →
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modals */}
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
