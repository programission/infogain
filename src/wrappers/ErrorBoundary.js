import React, { createContext } from "react";

export const ErrorContext = createContext({ errors: [], setError: () => {} });

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  static getDerivedStateFromError(error, prevState) {
    return { errors: [...prevState, error] };
  }

  handlePushError = (error, componentStack) => {
    this.setState((prev) => ({
      errors: [...prev.errors, { error, componentStack }],
    }));
  };

  render() {
    return (
      <>
        {!!this.state.errors.length && <p>Something went wrong</p>}
        <ErrorContext.Provider
          value={{
            errors: this.state.errors,
            setError: this.handlePushError,
          }}
        >
          {this.props.children}
        </ErrorContext.Provider>
      </>
    );
  }
}
