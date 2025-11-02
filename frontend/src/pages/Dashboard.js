import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { crimeAPI } from '../utils/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (user.role === 'admin') {
      try {
        const response = await crimeAPI.getStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
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
      <h2 className="mb-4">Welcome, {user.name}! 👋</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {user.role === 'admin' ? (
        <>
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>📊</div>
                  <h3 className="mb-0">{stats?.totalCrimes || 0}</h3>
                  <p className="text-muted mb-0">Total Cases</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 shadow-sm bg-warning bg-opacity-10">
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>🔓</div>
                  <h3 className="mb-0">{stats?.openCases || 0}</h3>
                  <p className="text-muted mb-0">Open Cases</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 shadow-sm bg-info bg-opacity-10">
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>🔍</div>
                  <h3 className="mb-0">{stats?.underInvestigation || 0}</h3>
                  <p className="text-muted mb-0">Under Investigation</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 shadow-sm bg-success bg-opacity-10">
                <Card.Body>
                  <div style={{ fontSize: '2rem' }}>✅</div>
                  <h3 className="mb-0">{stats?.closedCases || 0}</h3>
                  <p className="text-muted mb-0">Closed Cases</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Crimes by Type</h5>
                </Card.Header>
                <Card.Body>
                  {stats?.crimesByType?.length > 0 ? (
                    <div>
                      {stats.crimesByType.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                          <span>{item._id}</span>
                          <span className="badge bg-primary">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No crime data available</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Recent Cases</h5>
                </Card.Header>
                <Card.Body>
                  {stats?.recentCrimes?.length > 0 ? (
                    <div>
                      {stats.recentCrimes.map((crime) => (
                        <div key={crime._id} className="mb-3 p-2 border-bottom">
                          <div className="d-flex justify-content-between">
                            <strong>{crime.caseNumber}</strong>
                            <span className={`badge bg-${
                              crime.status === 'Open' ? 'warning' :
                              crime.status === 'Under Investigation' ? 'info' :
                              crime.status === 'Closed' ? 'success' : 'secondary'
                            }`}>
                              {crime.status}
                            </span>
                          </div>
                          <small className="text-muted">{crime.title}</small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No recent cases</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4>Your Dashboard</h4>
                <p className="text-muted">
                  Welcome to CrimeTrack. You have view-only access to crime records 
                  that are assigned to you or reported by you.
                </p>
                <hr />
                <div className="mb-3">
                  <strong>Role:</strong> <span className="badge bg-secondary">{user.role}</span>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {user.email}
                </div>
                {user.department && (
                  <div className="mb-3">
                    <strong>Department:</strong> {user.department}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;