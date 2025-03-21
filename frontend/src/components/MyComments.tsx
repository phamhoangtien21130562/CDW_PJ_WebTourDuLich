import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/css/my-comments.css';

interface MyCommentsProps {}

interface MyCommentsState {}

class MyComments extends Component<MyCommentsProps, MyCommentsState> {
  render() {
    return (
      <Container className="my-comments-container">
        <h3 className="text-center mb-4">Bình luận của tôi</h3>
        <div className="no-comments text-center">
          <img
            src="https://member.ivivu.com/assets/img/user-dashboard/emptytrip.png"
            alt="No comments"
            className="no-comments-image"
          />
          <p className="mt-3">Quý khách chưa có đánh giá nào</p>
        </div>
      </Container>
    );
  }
}

export default MyComments;