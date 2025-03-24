import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { bookServ } from "../../service/appService";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await bookServ.getCate();
      setCategories(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    setCategoryName("");
  };

  const handleSave = async () => {
    if (editingId) {
      await bookServ.updateCate(editingId, { categoryName });
    } else {
      await bookServ.postCate({ categoryName });
    }
    fetchCategories();
    handleClose();
  };

  const handleDelete = async (id) => {
    await bookServ.deleteCate(id);
    fetchCategories();
  };

  return (
    <div className="container">
      <h2>Categories</h2>
      <Button onClick={() => {
        setShowModal(true);
        setEditingId(null);
        setCategoryName("");
      }}>Add Category</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat._id}</td>
              <td>{cat.categoryName}</td>
              <td>
                <Button onClick={() => {
                  setCategoryName(cat.categoryName);
                  setEditingId(cat._id);
                  setShowModal(true);
                }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(cat._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
