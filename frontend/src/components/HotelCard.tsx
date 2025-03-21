import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface Hotel {
  id: number;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  offer: string;
  package: string;
  price: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <Card className="hotel-card">
      <div className="position-relative">
        <Card.Img variant="top" src={hotel.image} alt={hotel.name} />
        {hotel.offer && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            {hotel.offer}
          </Badge>
        )}
      </div>
      <Card.Body>
        <Card.Title className="hotel-name">{hotel.name}</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <span className="badge bg-primary me-2">{hotel.rating}</span>
          <span>({hotel.reviews} đánh giá)</span>
        </div>
        <Card.Text className="hotel-description">{hotel.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 text-muted">{hotel.package}</p>
            <p className="mb-0 text-danger fw-bold">{hotel.price} VNĐ</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;