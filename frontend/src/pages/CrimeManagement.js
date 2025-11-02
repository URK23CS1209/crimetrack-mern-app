import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert, Badge, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { crimeAPI } from '../utils/api';
const CrimeManagement = () => {
  const { user } = useContext(AuthContext);
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState(null);

  
  const [formData, setFormData] = useState({
    caseNumber: '',
    title: '',
    description: '',
    crimeType: 'Theft',
    location: '',
    dateOccurred: '',
    status: 'Open',
    severity: 'Medium'
  });

  const crimeTypes = ['Theft', 'Assault', 'Fraud', 'Burglary', 'Homicide', 'Cybercrime', 'Drug Offense', 'Vandalism', 'Other'];
  const statuses = ['Open', 'Under Investigation', 'Closed', 'Suspended'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];

  useEffect(() => {
    fetchCrimes();
  }, []);

  const fetchCrimes = async () => {
    try {
      const response = await crimeAPI.getAllCrimes();
      setCrimes(response.data);
    } catch (err) {
      setError('Failed to load crime records');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCrime = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await crimeAPI.addCrime(formData);
      setSuccess('Crime record added successfully!');
      setShowAddModal(false);
      setFormData({
        caseNumber: '',
        title: '',
        description: '',
        crimeType: 'Theft',
        location: '',
        dateOccurred: '',
        status: 'Open',
        severity: 'Medium'
      });
      fetchCrimes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add crime record');
    }
  };

  const handleEditCrime = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await crimeAPI.updateCrime(selectedCrime._id, formData);
      setSuccess('Crime record updated successfully!');
      setShowEditModal(false);
      fetchCrimes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update crime record');
    }
  };

  const handleDeleteCrime = async () => {
    setError('');
    setSuccess('');

    try {
      await crimeAPI.deleteCrime(selectedCrime._id);
      setSuccess('Crime record deleted successfully!');
      setShowDeleteModal(false);
      fetchCrimes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete crime record');
    }
  };

  const openViewModal = (crime) => {
    setSelectedCrime(crime);
    setShowViewModal(true);
  };

  const openEditModal = (crime) => {
    setSelectedCrime(crime);
    setFormData({
      caseNumber: crime.caseNumber,
      title: crime.title,
      description: crime.description,
      crimeType: crime.crimeType,
      location: crime.location,
      dateOccurred: crime.dateOccurred.split('T')[0],
      status: crime.status,
      severity: crime.severity
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (crime) => {
    setSelectedCrime(crime);
    setShowDeleteModal(true);
  };


  
  const getStatusBadge = (status) => {
    const variants = {
      'Open': 'warning',
      'Under Investigation': 'info',
      'Closed': 'success',
      'Suspended': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getSeverityBadge = (severity) => {
    const variants = {
      'Low': 'success',
      'Medium': 'warning',
      'High': 'danger',
      'Critical': 'dark'
    };
    return <Badge bg={variants[severity] || 'secondary'}>{severity}</Badge>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>📋 Crime Records</h2>
        </Col>
        {user.role === 'admin' && (
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              ➕ Add New Crime Record
            </Button>
          </Col>
        )}
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Case Number</th>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Severity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crimes.length > 0 ? (
                crimes.map((crime) => (
                  <tr key={crime._id}>
                    <td><strong>{crime.caseNumber}</strong></td>
                    <td>{crime.title}</td>
                    <td>{crime.crimeType}</td>
                    <td>{crime.location}</td>
                    <td>{getStatusBadge(crime.status)}</td>
                    <td>{getSeverityBadge(crime.severity)}</td>
                    <td>
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => openViewModal(crime)}
                      >
                        View
                      </Button>
                      {user.role === 'admin' && (
                        <>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => openEditModal(crime)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => openDeleteModal(crime)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No crime records found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* View Crime Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Crime Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCrime && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Case Number:</strong> {selectedCrime.caseNumber}
                </Col>
                <Col md={6}>
                  <strong>Status:</strong> {getStatusBadge(selectedCrime.status)}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Type:</strong> {selectedCrime.crimeType}
                </Col>
                <Col md={6}>
                  <strong>Severity:</strong> {getSeverityBadge(selectedCrime.severity)}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Title:</strong> {selectedCrime.title}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Description:</strong>
                  <p className="mt-2">{selectedCrime.description}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Location:</strong> {selectedCrime.location}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Date Occurred:</strong> {new Date(selectedCrime.dateOccurred).toLocaleDateString()}
                </Col>
                <Col md={6}>
                  <strong>Date Reported:</strong> {new Date(selectedCrime.dateReported).toLocaleDateString()}
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Crime Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Crime Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCrime}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Case Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crime Type *</Form.Label>
                  <Form.Select
                    name="crimeType"
                    value={formData.crimeType}
                    onChange={handleChange}
                    required
                  >
                    {crimeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Occurred *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOccurred"
                    value={formData.dateOccurred}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status *</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Severity *</Form.Label>
                  <Form.Select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                  >
                    {severities.map(severity => (
                      <option key={severity} value={severity}>{severity}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Add Crime Record
              </Button>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Crime Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Crime Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCrime}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Case Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Crime Type *</Form.Label>
                  <Form.Select
                    name="crimeType"
                    value={formData.crimeType}
                    onChange={handleChange}
                    required
                  >
                    {crimeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Occurred *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOccurred"
                    value={formData.dateOccurred}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status *</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Severity *</Form.Label>
                  <Form.Select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                  >
                    {severities.map(severity => (
                      <option key={severity} value={severity}>{severity}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Update Crime Record
              </Button>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete crime record <strong>{selectedCrime?.caseNumber}</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCrime}>
            Delete Record
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CrimeManagement;

