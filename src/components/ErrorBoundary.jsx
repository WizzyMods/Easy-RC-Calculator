import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Application Error:', error, errorInfo);
    }

    handleReset = () => {
        localStorage.clear();
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    background: '#111',
                    color: '#fff',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '1rem', color: '#ef4444' }}>Something went wrong</h2>
                    <p style={{ marginBottom: '2rem', color: '#aaa', maxWidth: '500px' }}>
                        The application encountered an error, possibly due to corrupted saved data.
                        Please try resetting the application.
                    </p>
                    <div style={{ marginBottom: '1rem', padding: '1rem', background: '#222', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'left', width: '100%', maxWidth: '600px', overflow: 'auto' }}>
                        {this.state.error && this.state.error.toString()}
                    </div>
                    <button
                        onClick={this.handleReset}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Reset Application & Clear Data
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
