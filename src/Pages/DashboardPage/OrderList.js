import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import EditOrderList from "../ModalOrderList/EditOrderList";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import DeleteOrderList from "../ModalOrderList/DeleteOrderList";
import AddOrderList from "../ModalOrderList/AddOrderList";
import DetailOrderList from "../ModalOrderList/DetailOrderList";
import "./OrderList.css";
import { bookServ } from "../../service/appService";

const ITEMS_PER_PAGE = 4;

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [datas, setDatas] = useState([]);


  useEffect(() => {
      bookServ
        .getOrder()
        .then((res) => {
          setDatas(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  

  // Pagination
  const totalPages = Math.ceil(datas.length / ITEMS_PER_PAGE);


  // Get current page items
  const displayedOrders = datas.slice(
    (curPage - 1) * ITEMS_PER_PAGE,
    curPage * ITEMS_PER_PAGE
  );

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
    <div className="order-list-container">
      <Container className="py-4">
        <Card className="main-card">
          <Card.Header className="main-card-header">
            DANH SÁCH ĐƠN HÀNG
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="search-container">
                <BsSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm mã đơn hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="table-responsive">
              <Table className="order-table">
                <thead>
                  <tr>
                    <th width="5%">STT</th>
                    <th width="25%">Mã Đơn Hàng</th>
                    <th width="25%">Mã Nhân Viên</th>
                    <th width="25%">Ngày Bán</th>
                    <th width="25%">Trạng Thái</th>
                    <th width="25%">Tổng Tiền</th>
                    <th width="20%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((order, index) => (
                    <tr key={`order-${order._id}`}>
                      <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="order-code">MO-{order._id.slice(-3)}</td>
                      <td className="employee-id">MN-{order.userID?._id.slice(-3)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                      <td className="order-code">{order.payStatus}</td>
                      <td className="order-code">{order.totalPrice}Đ</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-warning"
                            className="edit-button"
                            onClick={() => handleEdit(order)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="delete-button"
                            onClick={() => handleDelete(order)}
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
