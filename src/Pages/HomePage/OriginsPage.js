import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { bookServ } from "../../service/appService";

const OriginsPage = () => {
  const [origins, setOrigins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [origin, setOrigin] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchOrigins();
  }, []);

  const fetchOrigins = async () => {
    try {
      const res = await bookServ.getMedia();
      setOrigins(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy nguồn gốc:", error);
    }
  };

  const handleSave = async () => {
    if (editingId) {
      await bookServ.updateOrigin(editingId, { origin });
    } else {
      await bookServ.postOrigin({ origin });
    }
    fetchOrigins();
    setShowModal(false);
    setOrigin("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await bookServ.deleteOrigin(id);
    fetchOrigins();
  };

  return (
    <div className="container">
      <h2>Origins</h2>
      <Button onClick={() => setShowModal(true)}>Add Origin</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {origins.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.origin}</td>
              <td>
                <Button onClick={() => { setOrigin(o.origin); setEditingId(o._id); setShowModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(o._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Origin" : "Add Origin"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OriginsPage;
