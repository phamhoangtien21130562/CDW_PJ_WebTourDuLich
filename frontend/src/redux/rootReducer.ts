// src/redux/rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Kết hợp các reducer lại
const rootReducer = combineReducers({
  user: userReducer,
});

// Định nghĩa kiểu cho Redux state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
