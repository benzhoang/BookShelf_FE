import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { bookServ } from "../../service/appService";

const ActorsPage = () => {
  const [actors, setActors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actorName, setActorName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const res = await bookServ.getAc();
      setActors(res.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy tác giả:", error);
    }
  };

  const handleSave = async () => {
    if (editingId) {
      await bookServ.updateActor(editingId, { actorName });
    } else {
      await bookServ.postActor({ actorName });
    }
    fetchActors();
    setShowModal(false);
    setActorName("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await bookServ.deleteActor(id);
    fetchActors();
  };

  return (
    <div className="container">
      <h2>Actors</h2>
      <Button onClick={() => setShowModal(true)}>Add Actor</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Actor Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor) => (
            <tr key={actor._id}>
              <td>{actor._id}</td>
              <td>{actor.actorName}</td>
              <td>
                <Button onClick={() => { setActorName(actor.actorName); setEditingId(actor._id); setShowModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(actor._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Actor" : "Add Actor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={actorName} onChange={(e) => setActorName(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActorsPage;
