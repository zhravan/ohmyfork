import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log for debugging in dev tools
    console.error('Content render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="container mx-auto px-4 py-6">
          <div className="p-4 border border-border rounded-md bg-muted/30">
            <div className="text-red-500 font-medium mb-2">Failed to render content.</div>
            <div className="text-sm text-muted-foreground">
              {this.state.error?.message || 'Check the console for details.'}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

