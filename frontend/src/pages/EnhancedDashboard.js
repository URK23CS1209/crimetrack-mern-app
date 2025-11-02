import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { crimeAPI } from '../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const EnhancedDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const fetchStats = useCallback(async () => {
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
  }, [user.role]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Chart Data Configurations
  const crimeTypeChartData = {
    labels: stats?.crimesByType?.map(item => item._id) || [],
    datasets: [
      {
        label: 'Number of Cases',
        data: stats?.crimesByType?.map(item => item.count) || [],
        backgroundColor: [
          'rgba(255, 215, 0, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 215, 0, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const statusChartData = {
    labels: ['Open', 'Under Investigation', 'Closed', 'Suspended'],
    datasets: [
      {
        label: 'Cases by Status',
        data: [
          stats?.openCases || 0,
          stats?.underInvestigation || 0,
          stats?.closedCases || 0,
          stats?.totalCrimes - (stats?.openCases + stats?.underInvestigation + stats?.closedCases) || 0,
        ],
        backgroundColor: [
          'rgba(255, 140, 0, 0.8)',
          'rgba(0, 191, 255, 0.8)',
          'rgba(0, 168, 107, 0.8)',
          'rgba(128, 128, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const trendChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Crime Trends 2024',
        data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45],
        fill: true,
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: 'rgba(255, 215, 0, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 215, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
    },
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="warning" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  return (
    <Container className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <h2 style={{ color: '#ffd700', fontWeight: '700' }}>
            🎯 Investigation Control Center
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Welcome back, <strong style={{ color: '#ffd700' }}>{user.name}</strong> 
            {user.role === 'admin' ? ' (System Administrator)' : ' (Officer)'}
          </p>
        </Col>
        <Col md="auto">
          <Form.Select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              background: 'rgba(30, 38, 65, 0.8)',
              color: '#ffd700',
              border: '2px solid #ffd700',
              fontWeight: '600'
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Form.Select>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {user.role === 'admin' ? (
        <>
          {/* Statistics Cards */}
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="text-center border-0 h-100" style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}>
                <Card.Body className="p-4">
                  <div style={{ fontSize: '3rem' }}>📊</div>
                  <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0a0e27' }}>
                    {stats?.totalCrimes || 0}
                  </h2>
                  <p className="mb-0" style={{ color: '#0a0e27', fontWeight: '600', fontSize: '1.1rem' }}>
                    Total Cases
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 h-100" style={{
                background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
                boxShadow: '0 10px 30px rgba(255, 140, 0, 0.4)',
              }}>
                <Card.Body className="p-4">
                  <div style={{ fontSize: '3rem' }}>🔓</div>
                  <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff' }}>
                    {stats?.openCases || 0}
                  </h2>
                  <p className="mb-0" style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>
                    Open Cases
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 h-100" style={{
                background: 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)',
                boxShadow: '0 10px 30px rgba(30, 144, 255, 0.4)',
              }}>
                <Card.Body className="p-4">
                  <div style={{ fontSize: '3rem' }}>🔍</div>
                  <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff' }}>
                    {stats?.underInvestigation || 0}
                  </h2>
                  <p className="mb-0" style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>
                    Investigating
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="text-center border-0 h-100" style={{
                background: 'linear-gradient(135deg, #00a86b 0%, #00d084 100%)',
                boxShadow: '0 10px 30px rgba(0, 168, 107, 0.4)',
              }}>
                <Card.Body className="p-4">
                  <div style={{ fontSize: '3rem' }}>✅</div>
                  <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff' }}>
                    {stats?.closedCases || 0}
                  </h2>
                  <p className="mb-0" style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem' }}>
                    Solved
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="g-4 mb-4">
            {/* Crime Types Bar Chart */}
            <Col lg={6}>
              <Card style={{ height: '400px' }}>
                <Card.Header>
                  <h5 className="mb-0">📈 Crimes by Type</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Bar data={crimeTypeChartData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Status Pie Chart */}
            <Col lg={6}>
              <Card style={{ height: '400px' }}>
                <Card.Header>
                  <h5 className="mb-0">🎯 Case Status Distribution</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Pie data={statusChartData} options={pieChartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Trend Line Chart */}
          <Row className="g-4 mb-4">
            <Col lg={12}>
              <Card style={{ height: '400px' }}>
                <Card.Header>
                  <h5 className="mb-0">📊 Crime Trends - Monthly Analysis</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <Line data={trendChartData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity & Quick Stats */}
          <Row className="g-4">
            {/* Recent Cases */}
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">🕐 Recent Cases</h5>
                </Card.Header>
                <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {stats?.recentCrimes?.length > 0 ? (
                    <div>
                      {stats.recentCrimes.map((crime) => (
                        <div key={crime._id} className="mb-3 p-3 border-bottom" style={{
                          borderColor: 'rgba(255, 215, 0, 0.2)',
                          transition: 'all 0.3s ease'
                        }}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong style={{ color: '#ffd700' }}>{crime.caseNumber}</strong>
                              <p className="mb-1" style={{ color: '#fff' }}>{crime.title}</p>
                              <small style={{ color: 'rgba(255,255,255,0.6)' }}>
                                {crime.crimeType} • {new Date(crime.dateReported).toLocaleDateString()}
                              </small>
                            </div>
                            <span className={`badge bg-${
                              crime.status === 'Open' ? 'warning' :
                              crime.status === 'Under Investigation' ? 'info' :
                              crime.status === 'Closed' ? 'success' : 'secondary'
                            }`}>
                              {crime.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>No recent cases</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Actions */}
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">⚡ Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-3">
                    <Button variant="primary" size="lg" href="/crimes">
                      🔍 View All Cases
                    </Button>
                    <Button variant="success" size="lg" onClick={() => window.location.href = '/crimes'}>
                      ➕ Add New Case
                    </Button>
                    <Button variant="info" size="lg" href="/users">
                      👥 Manage Officers
                    </Button>
                    <Button variant="warning" size="lg">
                      📄 Generate Report
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* System Info */}
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">ℹ️ System Info</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-2">
                    <strong style={{ color: '#ffd700' }}>Total Officers:</strong>
                    <span style={{ color: '#fff', marginLeft: '10px' }}>{stats?.totalUsers || 0}</span>
                  </div>
                  <div className="mb-2">
                    <strong style={{ color: '#ffd700' }}>Success Rate:</strong>
                    <span style={{ color: '#00d084', marginLeft: '10px' }}>
                      {stats?.totalCrimes > 0 
                        ? Math.round((stats?.closedCases / stats?.totalCrimes) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong style={{ color: '#ffd700' }}>Active Investigations:</strong>
                    <span style={{ color: '#fff', marginLeft: '10px' }}>
                      {(stats?.openCases || 0) + (stats?.underInvestigation || 0)}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <h4 style={{ color: '#ffd700' }}>👮 Officer Dashboard</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Welcome to the CrimeTrack Investigation System. You have view-only access to crime records 
                  assigned to you.
                </p>
                <hr style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }} />
                <div className="mb-3">
                  <strong style={{ color: '#ffd700' }}>Role:</strong> 
                  <span className="badge bg-secondary ms-2">{user.role}</span>
                </div>
                <div className="mb-3">
                  <strong style={{ color: '#ffd700' }}>Email:</strong> 
                  <span style={{ color: '#fff', marginLeft: '10px' }}>{user.email}</span>
                </div>
                {user.department && (
                  <div className="mb-3">
                    <strong style={{ color: '#ffd700' }}>Department:</strong> 
                    <span style={{ color: '#fff', marginLeft: '10px' }}>{user.department}</span>
                  </div>
                )}
                <Button variant="primary" href="/crimes" className="mt-3">
                  View Assigned Cases
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EnhancedDashboard;