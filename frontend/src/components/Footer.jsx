import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
          <p>
          Shanta &amp; Tarha &copy; {currentYear} Powered by{' '}
          <a href="https://www.namratech.com" target="_blank" rel="noopener noreferrer">
            Namra Tech
          </a>
        </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
