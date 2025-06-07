// src/redux/actions/userActions.ts

// Action type
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action creators
export const setUser = (user: { id: string; email: string; role: string }) => ({
  type: SET_USER,
  payload: user,  // Thông tin người dùng
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
