import React, { useState } from 'react';
import { Form, Row, Col, Button, Card, Accordion } from 'react-bootstrap';

const AdvancedSearch = ({ onSearch, onReset }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    crimeType: '',
    status: '',
    severity: '',
    dateFrom: '',
    dateTo: '',
    location: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      crimeType: '',
      status: '',
      severity: '',
      dateFrom: '',
      dateTo: '',
      location: ''
    };
    setFilters(resetFilters);
    onReset();
  };

  return (
    <Card className="mb-4" style={{ border: '2px solid #ffd700' }}>
      <Card.Header style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', color: '#0a0e27' }}>
        <h5 className="mb-0">🔍 Advanced Search & Filter</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>🔎 Search (Case #, Title, Description)</Form.Label>
                <Form.Control
                  type="text"
                  name="searchTerm"
                  placeholder="Enter keywords..."
                  value={filters.searchTerm}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>📍 Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>🔖 Crime Type</Form.Label>
                <Form.Select name="crimeType" value={filters.crimeType} onChange={handleChange}>
                  <option value="">All Types</option>
                  <option value="Theft">Theft</option>
                  <option value="Assault">Assault</option>
                  <option value="Fraud">Fraud</option>
                  <option value="Burglary">Burglary</option>
                  <option value="Homicide">Homicide</option>
                  <option value="Cybercrime">Cybercrime</option>
                  <option value="Drug Offense">Drug Offense</option>
                  <option value="Vandalism">Vandalism</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>📊 Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleChange}>
                  <option value="">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Closed">Closed</option>
                  <option value="Suspended">Suspended</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>⚠️ Severity</Form.Label>
                <Form.Select name="severity" value={filters.severity} onChange={handleChange}>
                  <option value="">All Severity</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>📅 Date From</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>📅 Date To</Form.Label>
                <Form.Control
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              🔍 Search
            </Button>
            <Button variant="warning" type="button" onClick={handleReset}>
              🔄 Reset Filters
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdvancedSearch;