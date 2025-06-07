import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Định nghĩa kiểu cho Props
interface PrivateRouteProps {
  children: ReactNode;  
  roles?: string[];    
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');
  
  // Nếu không có token, chuyển hướng về trang đăng nhập
  if (!token) {
    return <Navigate to="/login" />;
  }

  const userRole = localStorage.getItem('userRole');  // Lấy vai trò người dùng từ localStorage (nếu có)

  // Kiểm tra quyền truy cập nếu có
  if (roles && !roles.includes(userRole || '')) {
    return <Navigate to="/" />;  // Người dùng không có quyền truy cập
  }

  // Người dùng đã đăng nhập và có quyền truy cập
  return <>{children}</>;
};

export default PrivateRoute;
