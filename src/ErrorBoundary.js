import React, { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError (error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Fragment>
          <p>There was an error:</p>
          <pre style={{ whiteSpace: 'normal' }}>
            {error.message}
          </pre>
          </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
