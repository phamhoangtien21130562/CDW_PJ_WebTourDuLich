// src/redux/reducers/userReducer.ts

import { LOGOUT_USER, SET_USER } from "./actions/userActions";


// Định nghĩa kiểu cho user
interface User {
  id: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;  // Thông tin người dùng hoặc null nếu chưa đăng nhập
}

const initialState: UserState = {
  user: null,  // Ban đầu người dùng chưa đăng nhập
};

// Reducer xử lý các action liên quan đến người dùng
const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,  // Lưu thông tin người dùng vào state
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,  // Đăng xuất và xóa thông tin người dùng
      };
    default:
      return state;
  }
};

export default userReducer;
