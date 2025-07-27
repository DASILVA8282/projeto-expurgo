import { useState, useEffect } from "react";
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
import Ranking from "@/pages/ranking";
import Match from "@/pages/match";
import Guide from "@/pages/guide";
import WeaponsManual from "@/pages/weapons-manual";
import Admin from "@/pages/admin";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Force timeout for loading screen to prevent infinite loops
  const [forceLoad, setForceLoad] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Force loading timeout reached, showing landing page");
      setForceLoad(true);
    }, 2500); // 2.5 second timeout
    return () => clearTimeout(timeout);
  }, []);

  console.log("Router state:", { isAuthenticated, isLoading, user: !!user, forceLoad });

  // If loading for too long or if there's an authentication error, show the landing page
  if (isLoading && !forceLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-lg mb-4 animate-menacing-glow shadow-2xl shadow-red-500/50">
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
              {/* Logo predador frontal - versão carregamento */}
              <rect x="8" y="8" width="44" height="44" fill="url(#loadingGradient)" rx="6" stroke="#7f1d1d" strokeWidth="2"/>
              <defs>
                <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626"/>
                  <stop offset="30%" stopColor="#991b1b"/>
                  <stop offset="70%" stopColor="#7f1d1d"/>
                  <stop offset="100%" stopColor="#450a0a"/>
                </linearGradient>
              </defs>
              <g>
                <path d="M15 14 L17 46" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95"/>
                <path d="M21 12 L23 48" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                <path d="M27 11 L29 49" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none"/>
                <path d="M33 12 L35 48" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                <path d="M39 14 L41 46" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95"/>
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
      {!isAuthenticated || !user ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/character" component={Character} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/match" component={Match} />
          <Route path="/admin" component={Admin} />
          <Route path="/guide" component={Guide} />
          <Route path="/weapons-manual" component={WeaponsManual} />
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
