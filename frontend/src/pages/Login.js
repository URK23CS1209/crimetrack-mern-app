import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(0, 168, 107, 0.1) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Top Navigation */}
      <Navbar bg="transparent" variant="dark" className="py-3" style={{ position: 'relative', zIndex: 10 }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ffd700' }}>
            🛡️ CrimeTrack Pro
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#fff', fontWeight: '500' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/signup" style={{ color: '#ffd700', fontWeight: '500' }}>Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container style={{ position: 'relative', zIndex: 5 }}>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={5}>
            <Card className="border-0 auth-card" style={{
              background: 'rgba(30, 38, 65, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              animation: 'fadeInUp 0.8s ease-out'
            }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))'
                  }}>🔐</div>
                  <h2 className="fw-bold mb-2" style={{
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '2rem'
                  }}>Secure Login</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                    Access your CrimeTrack Pro account
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" style={{
                    background: 'rgba(220, 20, 60, 0.2)',
                    border: '1px solid rgba(220, 20, 60, 0.3)',
                    color: '#ff6b6b',
                    borderRadius: '10px'
                  }}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ffd700', fontWeight: '600', fontSize: '1.1rem' }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: '12px',
                        border: '2px solid rgba(255, 215, 0, 0.3)',
                        padding: '0.8rem 1rem',
                        fontSize: '1rem',
                        background: 'rgba(30, 38, 65, 0.8)',
                        color: '#fff',
                        transition: 'all 0.3s ease'
                      }}
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#ffd700', fontWeight: '600', fontSize: '1.1rem' }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: '12px',
                        border: '2px solid rgba(255, 215, 0, 0.3)',
                        padding: '0.8rem 1rem',
                        fontSize: '1rem',
                        background: 'rgba(30, 38, 65, 0.8)',
                        color: '#fff',
                        transition: 'all 0.3s ease'
                      }}
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-4 login-btn"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '1rem',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#0a0e27',
                      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {loading ? '🔄 Authenticating...' : '🚀 Login Securely'}
                  </Button>

                  <div className="text-center">
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                      Don't have an account?
                    </p>
                    <Link
                      to="/signup"
                      style={{
                        color: '#ffd700',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease'
                      }}
                      className="signup-link"
                    >
                      Create Account →
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .form-control-custom:focus {
          border-color: #ffd700 !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25) !important;
          background: rgba(30, 38, 65, 0.95) !important;
          color: #fff !important;
        }

        .login-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 215, 0, 0.6);
        }

        .signup-link:hover {
          color: #ffed4e !important;
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

export default Login;
