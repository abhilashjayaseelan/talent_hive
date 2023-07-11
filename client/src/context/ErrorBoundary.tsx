import React, { ErrorInfo, ReactNode } from 'react';
import NotFound from '../components/Error/NotFound';

type ErrorBoundaryState = {
  error: Error | null;
};

type ErrorBoundaryProps = {
  children?: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <NotFound/>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
