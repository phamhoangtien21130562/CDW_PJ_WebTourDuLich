// components/TicketCard.tsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface Ticket {
  image: string;
  title: string;
  rating: string;
  reviews: number;
  description: string;
  bookingStats: string;
  price: string;
  badge?: string;
}

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <Card className="ticket-card">
      <div className="position-relative">
        <Card.Img variant="top" src={ticket.image} alt={ticket.title} />
        {ticket.badge && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            {ticket.badge}
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="ticket-card-title">{ticket.title}</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <Badge bg="success" className="me-2">
            {ticket.rating} Xuất sắc
          </Badge>
          <span className="text-muted">{ticket.reviews} đánh giá</span>
        </div>
        <Card.Text className="ticket-card-description flex-grow-1">
          {ticket.description}
        </Card.Text>
        <div className="text-muted mb-2">{ticket.bookingStats}</div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="text-danger fw-bold">{ticket.price}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TicketCard;