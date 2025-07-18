import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Character from "@/pages/character";
import Admin from "@/pages/admin";
import Match from "@/pages/match";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block p-4 expurgo-gradient rounded-lg mb-4 animate-menacing-glow">
            <svg width="48" height="48" viewBox="0 0 48 48" className="text-white">
              {/* Marcas de garra - 5 riscos diagonais maiores e centralizados */}
              <g transform="translate(24,24) rotate(-20) translate(-24,-24)">
                <path d="M8 4 L12 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M14 2 L18 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M20 1 L24 41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M26 2 L30 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M32 4 L36 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </g>
            </svg>
          </div>
          <h1 className="font-bebas text-3xl font-bold text-red-500 tracking-wider">CARREGANDO EXPURGO...</h1>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/character" component={Character} />
          <Route path="/admin" component={Admin} />
          <Route path="/match" component={Match} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
