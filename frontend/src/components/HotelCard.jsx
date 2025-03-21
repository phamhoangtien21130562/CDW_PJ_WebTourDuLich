import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const HotelCard = ({ hotel }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={hotel.image} alt={hotel.name} />
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <span className="text-warning">★★★★★</span>
          <Badge bg="success" className="ms-2">{hotel.rating}</Badge>
          <span className="ms-2 text-muted">Tuyệt vời | {hotel.reviews} đánh giá</span>
        </div>
        <Card.Text>{hotel.description}</Card.Text>
        <Badge bg="danger" className="mb-2">{hotel.offer}</Badge>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">{hotel.package}</span>
          <h5 className="text-danger">{hotel.price} <small>/khách</small></h5>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;