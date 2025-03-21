
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/tour.css';
import TourCard from './TourCard';

// Sample data for recently viewed tours (small cards)
const recentlyViewedTours = [
  {
    image: 'https://cdn2.ivivu.com/2023/09/14/14/ivivu-nhat-ban-osaka-360x225.jpg',
    title: 'Tour Nhật Bản 5N4Đ: HCM - Tokyo - Phú Sĩ - Yamanashi',
    price: '23.999.000 VNĐ',
  },
  {
    image: 'https://cdn2.ivivu.com/2023/09/14/14/ivivu-nhat-ban-osaka-360x225.jpg',
    title: 'Tour Liên Tuyến 5N4Đ: HCM - Bangkok - Pattaya - Đảo San Hô',
    price: '6.800.000 VNĐ',
  },
];

// Sample data for best tour deals (main section)
const bestTours = [
  {
    image: 'https://cdn2.ivivu.com/2023/09/14/14/ivivu-nhat-ban-osaka-360x225.jpg',
    title: 'Tour Đà Lạt 4N3Đ: HCM - Đà Lạt Tương - Biển Cát Mỵ - Ngõ Nhật Nguyệt - Thác Phú Đài - Đỉnh Bạc',
    description: '★ 4 ngày 3 đêm ★ Tương Đài Thạch - Long Sơn Tự ★ Chùa Phước Điệp',
    price: '9.990.000 VNĐ',
    badge: 'NHẮN TAY ĐẶT NGAY, ĐỪNG SẺ LỠ',
    icons: ['star-fill', 'heart-fill'],
  },
  {
    image: 'https://cdn2.ivivu.com/2023/09/14/14/ivivu-nhat-ban-osaka-360x225.jpg',
    title: 'Tour Nhật Bản 6N5Đ: Tokyo - Fuji - Nagoya - Kyoto - Osaka Ma He',
    description: '★ Du Ngọa Bảy Kanakugo ★ Chùa Vĩnh Nghiêm Kuji ★ Thì Nhung Miền Ngõ Nhật Yota',
    price: '31.899.000 VNĐ',
    badge: 'NHẮN 4 CHỈ 3 TRẢ + TẶNG SIM',
    icons: ['star-fill', 'heart-fill'],
  },
  {
    image: 'https://cdn2.ivivu.com/2023/09/14/14/ivivu-nhat-ban-osaka-360x225.jpg',
    title: 'Tour Nhật Bản Giáng Sinh 5N4Đ: HCM - Tokyo - Phú Sĩ - Yamanashi',
    description: '★ 9 Ngày 4 Đêm ★ Cung Điện Hoàng Gia ★ Cống Viên Oshino Hakkai ★ Làng Văn Hóa Oshino Hakkai',
    price: '23.999.000 VNĐ',
    badge: 'TẶNG SIM',
    icons: ['star-fill', 'heart-fill'],
  },
];

// Sample data for holiday tours (new section)
const holidayTours = [
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Đà Nẵng 4N3Đ: Hà Nội - Bà Nà - Hội An - Rừng Dừa Bảy Mẫu (Lễ 30/4)',
    description: '★ Phố Cổ Hội An - Bà Nà Hill - Biển Sơn Trà ★ Rừng Dừa Bảy Mẫu',
    price: '8.390.000 VNĐ',
    badge: 'KH 30/4',
    duration: '★ 4 Ngày 3 Đêm',
    transport: 'plane',
  },
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Miền Bắc 5N4Đ: HCM - Hà Nội - Hà Long - Tràng An - Ninh Bình - Tam Chúc - Sapa',
    description: '★ 7 Khách Tốt 1 Đánh Giá ★ Động Thiên Cung - Tràng An - Chùa Tam Chúc ★ Đỉnh Fansipan',
    price: '9.990.000 VNĐ',
    badge: 'KH 30/4',
    duration: '★ 7 Ngày',
    offer: 'Ưu việt từ 1 khách đặt',
  },
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Phú Quốc 3N2Đ: HCM - Phú Quốc - KDL Hòn Thơm - Grand World',
    description: '★ Grand World - Cáp Treo Hòn Thơm - Sunset Town',
    price: '7.890.000 VNĐ',
    badge: 'KH 30/4 & 01/05',
    duration: '★ 10 Ngày',
    offer: 'Ưu việt từ 1 khách đặt',
  },
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Phú Quốc 3N2Đ: HCM - Hòn Tranh - Đảo Phú Quốc Huyền Thoại',
    description: '★ Check-in Eo Gió (Lễ 30/4)',
    price: '8.390.000 VNĐ',
    badge: 'KH 30/4 & 01/05',
    duration: '★ 3 Ngày 2 Đêm',
    transport: 'car',
  },
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Quy Nhơn - Phú Yên 4N3Đ: Hà Nội - Xứ Sờ Hoa Vàng Cỏ Xanh - Ghềnh Đá Đĩa',
    description: '★ Check-in Eo Gió (Lễ 30/4)',
    price: '8.390.000 VNĐ',
    badge: 'KH 30/4 & 01/05',
    duration: '★ 4 Ngày 3 Đêm',
    transport: 'plane',
  },
  {
    image: 'https://cdn2.ivivu.com/2020/12/02/18/ivivu-fansipan-bia1-360x225.gif',
    title: 'Tour Miền Trung 3N2Đ: HCM - Quy Nhơn - Kỳ Co Eo Gió - Phú Yên - Quy Nhơn',
    description: '★ 10 Ngày ★ Ưu việt từ 1 khách đặt',
    price: '7.890.000 VNĐ',
    badge: 'KH 30/4 & 01/05',
    duration: '★ 3 Ngày 2 Đêm',
    transport: 'plane',
    offer: 'Ưu việt từ 1 khách đặt',
  },
];

function Tour() {
  return (
    <div className="App">
      {/* Recently Viewed Tours Section */}
      <Container className="mt-6">
        <h3 className="mb-5">Tours du lịch bạn đã xem gần đây</h3>
        <Row className="mt-6">
          {recentlyViewedTours.map((tour, index) => (
            <Col md={4} key={index} className="mb-4">
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Best Tours Section */}
      <Container className="mt-5">
        <h3 className="mb-5">Tour Ưu Đãi Tốt Nhất Hôm Nay</h3>
        <h5 className="text-muted">Nhắn Tay Đặt Ngay, Đừng Sẻ Lỡ</h5>
        <Row>
          {bestTours.map((tour, index) => (
            <Col md={4} key={index} className="mb-4">
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Holiday Tours Section */}
      <Container className="mt-5">
        <h3 className="mb-5">Tour Du Lịch Lễ 30/04 Nổi Địa</h3>
        <h5 className="text-muted">Chốt Lịch Đi, Khởi Hành Lễ Về Lễ</h5>
        <Row>
          {holidayTours.map((tour, index) => (
            <Col md={4} key={index} className="mb-4">
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Tour;