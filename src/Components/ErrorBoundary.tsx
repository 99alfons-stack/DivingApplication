import React from "react";

type State = {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: string;
};

export default class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state: State = { hasError: false, error: null, errorInfo: undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
   
    console.error("Unhandled error in component tree:", error, info);
    this.setState({ errorInfo: info.componentStack });
  }

  handleReload = () => {
    try {
      window.location.reload();
    } catch (_) {
     
      window.location.href = "/";
    }
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleCopy = async () => {
    const details = `${this.state.error?.message || ""}\n\n${this.state.errorInfo || ""}`;
    try {
      await navigator.clipboard.writeText(details);
      
      alert("Felinformation kopierad till urklipp.");
    } catch (_) {
      
      alert("Kunde inte kopiera automatiskt. Markera och kopiera manuellt.");
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children as React.ReactElement;

    const details = `${this.state.error?.message || "(no message)"}\n\n${this.state.errorInfo || "(no stack)"}`;

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold">Oj — ett oväntat fel uppstod</h2>
          <p className="text-sm text-gray-600">Applikationen kunde inte rendera den här vyn. Du kan prova något av alternativen nedan eller kopiera felinformationen för support.</p>

          <pre className="mt-4 max-h-48 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-800">{details}</pre>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={this.handleReload} className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">Ladda om</button>
            <button onClick={this.handleGoHome} className="rounded border border-gray-200 px-3 py-2 text-sm">Gå till startsidan</button>
            <button onClick={this.handleCopy} className="rounded border border-gray-200 px-3 py-2 text-sm">Kopiera fel</button>
          </div>
        </div>
      </div>
    );
  }
}
