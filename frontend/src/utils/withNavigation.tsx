import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

type WithNavigationProps = {
  navigate: NavigateFunction;
};

export function withNavigation<P extends object>(
  Component: React.ComponentType<P & WithNavigationProps>
) {
  return function WrappedComponent(props: P) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
