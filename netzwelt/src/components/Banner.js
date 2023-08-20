import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner ({data}) {
  const { title, content, destination, label} = data;

  return (
    <Container fluid>
    <Row>
      <Col className="p-5 text-center font">
        <h1 className='font'>{title}</h1>
        <p>{content}</p>
        <Link className='btn btn-dark w-fit px-4 py-2.5 font-bold text-sm' to={destination}>{label}</Link>
      </Col>
    </Row>
    </Container>
  );
}