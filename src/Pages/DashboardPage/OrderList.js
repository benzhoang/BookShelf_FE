import React, { useEffect, useState } from "react";
import { Table, Form, Container, Button, Card } from "react-bootstrap";
import EditOrderList from "../ModalOrderList/EditOrderList";
import DeleteOrderList from "../ModalOrderList/DeleteOrderList";
import AddOrderList from "../ModalOrderList/AddOrderList";
import DetailOrderList from "../ModalOrderList/DetailOrderList";
import { bookServ } from "../../service/appService";
import "./OrderList.css";

const ITEMS_PER_PAGE = 4;

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [payStatus, setPayStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  // Filter orders based on search inputs
  const filteredOrders = datas.filter((order) => {
    const orderCode = `MO-${order._id.slice(-3)}`.toLowerCase();
    const employeeCode = order.userID?._id
      ? `MN-${order.userID._id.slice(-3)}`.toLowerCase()
      : "Nhân viên đã nghỉ làm";
    const orderDate = new Date(order.createdAt);
    const totalPrice = parseFloat(order.totalPrice);

    return (
      orderCode.includes(searchTerm.toLowerCase()) &&
      employeeCode.includes(employeeSearch.toLowerCase()) &&
      (!dateStart || orderDate >= new Date(dateStart)) &&
      (!dateEnd || orderDate <= new Date(dateEnd)) &&
      (!payStatus || order.payStatus === payStatus) &&
      (!minPrice || totalPrice >= parseFloat(minPrice)) &&
      (!maxPrice || totalPrice <= parseFloat(maxPrice))
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const displayedOrders = filteredOrders.slice(
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

  return (
    <div className="order-list-container">
      <Container className="py-4">
        <Card className="main-card">
          <Card.Header className="main-card-header">
            DANH SÁCH ĐƠN HÀNG
          </Card.Header>
          <Card.Body>
            <div className="filter-container">
              <div className="d-flex gap-2 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm mã đơn hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Form.Control
                  type="text"
                  placeholder="Mã nhân viên..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                />
                <Form.Control
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
                <Form.Control
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
                <Form.Select
                  value={payStatus}
                  onChange={(e) => setPayStatus(e.target.value)}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="Success">Đã thanh toán</option>
                  <option value="pendig">Chưa thanh toán</option>
                </Form.Select>
                <Form.Control
                  type="number"
                  placeholder="Giá tối thiểu"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder="Giá tối đa"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <Table className="order-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã Đơn Hàng</th>
                    <th>Mã Nhân Viên</th>
                    <th>Ngày Bán</th>
                    <th>Trạng Thái</th>
                    <th>Tổng Tiền</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((order, index) => (
                    <tr key={`order-${order._id}`}>
                      <td>{(curPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td>MO-{order._id.slice(-3)}</td>
                      <td>
                        {order.userID?._id
                          ? `MN-${order.userID._id.slice(-3)}`
                          : "Nhân viên đã nghỉ làm"}
                      </td>
                      <td>
                        {new Date(order?.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td>{order.payStatus}</td>
                      <td>{order.totalPrice}Đ</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          onClick={() => handleEdit(order)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(order)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="pagination-container">
              <Button
                variant="outline-secondary"
                onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
                disabled={curPage === 1}
              >
                &laquo; Trang trước
              </Button>
              <span>
                Trang {curPage} / {totalPages}
              </span>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setCurPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={curPage === totalPages}
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
