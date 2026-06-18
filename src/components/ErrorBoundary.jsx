import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-8 max-w-md w-full text-center space-y-4">
          <div className="text-5xl">🌸</div>
          <h1 className="text-2xl font-bold text-rose-600">Something went wrong</h1>
          <p className="text-sm text-rose-400 leading-relaxed">
            HerSync ran into an unexpected error. Your data is safe — please
            refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-rose-500 text-white px-6 py-2 rounded-xl hover:bg-rose-400 transition text-sm"
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre className="text-left text-xs text-rose-300 bg-rose-50 rounded-xl p-3 overflow-auto max-h-40">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
