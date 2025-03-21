import React from 'react';
import { Card, Badge } from 'react-bootstrap';

// Define the shape of the tour object
interface Tour {
  image: string;
  title: string;
  price: string;
  description?: string; // Optional, since it’s not in the error but used in the code
  badge?: string; // Optional, based on conditional rendering
  icons?: string[]; // Optional, based on conditional rendering
}

// Define the props for TourCard
interface TourCardProps {
  tour: Tour;
  isSmall?: boolean; // Optional prop with ? (defaults to false if omitted)
}

const TourCard: React.FC<TourCardProps> = ({ tour, isSmall }) => {
  return (
    <Card className={`tour-card ${isSmall ? 'small' : ''}`}>
      <div className="position-relative">
        <Card.Img variant="top" src={tour.image} alt={tour.title} />
        {tour.badge && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            {tour.badge}
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="tour-card-title">{tour.title}</Card.Title>
        <Card.Text className="tour-card-description flex-grow-1">{tour.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="text-danger fw-bold">{tour.price}</span>
          {tour.icons && (
            <div className="d-flex">
              {tour.icons.map((icon, index) => (
                <i key={index} className={`bi bi-${icon} me-2 text-muted`}></i>
              ))}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TourCard;