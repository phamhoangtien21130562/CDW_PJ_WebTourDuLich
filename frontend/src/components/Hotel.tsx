
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Calendar, People } from 'react-bootstrap-icons'; // Import icon
import HotelCard from './HotelCard';
import '../assets/css/hotel.css';

// Mảng hotels đã được cập nhật với id
const hotels = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300x200',
    name: 'Khách sạn FLC Luxury Quy Nhơn',
    rating: 9.2,
    reviews: 946,
    description: 'Bể bơi thiết kế hoàn hảo cho trẻ em, rất an toàn, nhiều chỗ chơi khách như phòng chơi, khu cầu trượt,...',
    offer: '1 khách đặt trong 24h qua',
    package: '3N2D/VMB+Ăn sáng',
    price: '3.199.900',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300x200',
    name: 'Khu nghỉ dưỡng ANGSANA Lăng Cô Huế',
    rating: 9.8,
    reviews: 177,
    description: 'Nhẹ nhàng và thanh khiết như người con gái Huế, Angsana Lăng Cô dành cho bạn một kỳ nghỉ tuyệt vời bên bờ biển trải dài bất tận',
    offer: '1 khách đặt trong 24h qua',
    package: '3N2D/VMB+Dura Đón',
    price: '5.199.900',
  },
  {
    id: 3,
    image: 'https://cdn1.ivivu.com/iVivu/2018/09/05/17/khach-san-flc-luxury-quy-nhon.webp?o=jpg',
    name: 'Khách sạn InterContinental Grand Hồ Tràm',
    rating: 9.6,
    reviews: 2223,
    description: 'Combo tiện lợi - Không căng nghĩ ngợi - Thoải mái đi chơi!',
    offer: '1 khách đặt trong 24h qua',
    package: '3N1D+Xe+Ăn Sáng',
    price: '1.250.000',
  },
];

function Hotels() {
  return (
    <div className="container my-4">
      {/* Thanh tìm kiếm */}
      <div className="search-bar mb-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
        <div className="d-flex flex-wrap align-items-center">
          {/* Địa điểm */}
          <div className="input-group me-3 mb-2">
            <span className="input-group-text" id="location-icon">
              <Search />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Bạn muốn đi đâu?"
              id="location-input"
              aria-label="Location"
            />
          </div>

          {/* Ngày nhận phòng */}
          <div className="input-group me-3 mb-2">
            <span className="input-group-text" id="checkin-icon">
              <Calendar />
            </span>
            <input
              type="date"
              className="form-control"
              defaultValue="2025-03-26"
              id="checkin-date"
              aria-label="Check-in Date"
            />
          </div>

          {/* Ngày trả phòng */}
          <div className="input-group me-3 mb-2">
            <span className="input-group-text" id="checkout-icon">
              <Calendar />
            </span>
            <input
              type="date"
              className="form-control"
              defaultValue="2025-03-27"
              id="checkout-date"
              aria-label="Check-out Date"
            />
          </div>

          {/* Số lượng người */}
          <div className="input-group me-3 mb-2">
            <span className="input-group-text" id="guests-icon">
              <People />
            </span>
            <select className="form-select" id="guests-select" aria-label="Guests">
              <option value="2-adults-0-children">2 người lớn, 0 trẻ em</option>
              <option value="1-adult-0-children">1 người lớn, 0 trẻ em</option>
              <option value="2-adults-1-child">2 người lớn, 1 trẻ em</option>
            </select>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <button className="btn btn-warning" id="search-button">
          Tìm
        </button>
      </div>

      {/* Danh sách khách sạn */}
      <div className="row">
        {hotels.map((hotel) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={hotel.id}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;