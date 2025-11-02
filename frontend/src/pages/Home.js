import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

      <Container className="py-5" style={{ position: 'relative', zIndex: 5 }}>
        <Row className="justify-content-center text-center mb-5 pt-5">
          <Col md={10}>
            <div style={{
              fontSize: '5rem',
              marginBottom: '2rem',
              animation: isVisible ? 'bounceIn 1s ease-out' : 'none',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
            }}>🛡️</div>
            <h1 className="display-2 fw-bold mb-4" style={{
              color: '#fff',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(255, 215, 0, 0.3)',
              animation: isVisible ? 'fadeInUp 1.2s ease-out' : 'none',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
              CrimeTrack
            </h1>
            <p className="lead mb-4" style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.4rem',
              animation: isVisible ? 'fadeInUp 1.4s ease-out' : 'none'
            }}>
              Advanced Digital Crime Investigation Management System
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.2rem',
              maxWidth: '800px',
              margin: '0 auto',
              animation: isVisible ? 'fadeInUp 1.6s ease-out' : 'none'
            }}>
              Revolutionize your investigative workflow with AI-powered analytics,
              real-time collaboration tools, and comprehensive case management.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 text-center border-0 feature-card" style={{
              background: 'rgba(30, 38, 65, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              transition: 'all 0.4s ease',
              animation: isVisible ? 'slideInLeft 1.8s ease-out' : 'none'
            }}>
              <Card.Body className="p-5">
                <div className="mb-4" style={{
                  fontSize: '4.5rem',
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>📊</div>
                <Card.Title style={{ fontSize: '1.6rem', fontWeight: '700', color: '#ffd700', marginBottom: '1rem' }}>
                  Smart Analytics
                </Card.Title>
                <Card.Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  AI-driven insights and predictive analytics help identify patterns,
                  prioritize cases, and optimize resource allocation for maximum efficiency.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-0 feature-card" style={{
              background: 'rgba(30, 38, 65, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              border: '1px solid rgba(0, 191, 255, 0.2)',
              transition: 'all 0.4s ease',
              animation: isVisible ? 'slideInUp 2s ease-out' : 'none'
            }}>
              <Card.Body className="p-5">
                <div className="mb-4" style={{
                  fontSize: '4.5rem',
                  background: 'linear-gradient(135deg, #00bfff, #1e90ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>👥</div>
                <Card.Title style={{ fontSize: '1.6rem', fontWeight: '700', color: '#00bfff', marginBottom: '1rem' }}>
                  Real-time Collaboration
                </Card.Title>
                <Card.Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Seamless team coordination with live updates, secure messaging,
                  and integrated communication tools for instant case coordination.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 text-center border-0 feature-card" style={{
              background: 'rgba(30, 38, 65, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              border: '1px solid rgba(0, 168, 107, 0.2)',
              transition: 'all 0.4s ease',
              animation: isVisible ? 'slideInRight 2.2s ease-out' : 'none'
            }}>
              <Card.Body className="p-5">
                <div className="mb-4" style={{
                  fontSize: '4.5rem',
                  background: 'linear-gradient(135deg, #00a86b, #00d084)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>🔒</div>
                <Card.Title style={{ fontSize: '1.6rem', fontWeight: '700', color: '#00d084', marginBottom: '1rem' }}>
                  Enterprise Security
                </Card.Title>
                <Card.Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Military-grade encryption, role-based access control,
                  and comprehensive audit trails ensure data integrity and compliance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Card className="border-0 cta-card" style={{
              background: 'rgba(30, 38, 65, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
              animation: isVisible ? 'zoomIn 2.4s ease-out' : 'none'
            }}>
              <Card.Body className="p-5">
                <h3 className="mb-4" style={{
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2rem'
                }}>
                  Start Your Investigation Today
                </h3>
                <p className="mb-4" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                  Join thousands of law enforcement professionals who trust CrimeTrack
                  for their critical investigative needs.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button
                    as={Link}
                    to="/signup"
                    size="lg"
                    style={{
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '1rem 2rem',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#0a0e27',
                      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                    className="cta-button"
                  >
                    🚀 Create Free Account
                  </Button>
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                    size="lg"
                    style={{
                      border: '2px solid rgba(255, 215, 0, 0.8)',
                      color: '#ffd700',
                      background: 'transparent',
                      borderRadius: '20px',
                      padding: '1rem 2rem',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                    className="cta-button-outline"
                  >
                    🔑 Sign In
                  </Button>
                </div>
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

        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(255, 215, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
        }

        .cta-button-outline:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: #ffd700;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};

export default Home;
