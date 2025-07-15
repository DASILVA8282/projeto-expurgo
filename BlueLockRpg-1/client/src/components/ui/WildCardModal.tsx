import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface WildCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WildCardModal({ isOpen, onClose }: WildCardModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setDoorOpened(false);
      setShowContent(false);
      
      // Start door opening animation
      const doorTimer = setTimeout(() => {
        setDoorOpened(true);
      }, 800);
      
      // Show content after door opens
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 2000);
      
      return () => {
        clearTimeout(doorTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setDoorOpened(false);
      setShowContent(false);
    }
  }, [isOpen]);

  const handleResponse = async (response: "accepted" | "rejected") => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/wildcard/respond", { response });

      toast({
        title: response === "accepted" ? "Wild Card Aceito!" : "Wild Card Rejeitado",
        description: response === "accepted" 
          ? "Você aceitou o desafio do Wild Card. Prepare-se para lutar!" 
          : "Você rejeitou o desafio. Seus sonhos foram destruídos...",
        variant: response === "accepted" ? "default" : "destructive",
      });
      
      onClose();
    } catch (error) {
      console.error("Wild Card response error:", error);
      toast({
        title: "Erro",
        description: "Falha ao responder ao convite do Wild Card",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-black border-0 text-white overflow-hidden p-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-describedby="wildcard-description">
        <DialogTitle className="sr-only">Wild Card Invitation</DialogTitle>
        <div className="sr-only">
          <p id="wildcard-description">You have received a Wild Card invitation for a second chance in Blue Lock</p>
        </div>
        <div className="relative min-h-[700px] flex flex-col items-center justify-center wildcard-dark-theme">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Smoke effects at door sides */}
          <AnimatePresence>
            {doorOpened && (
              <>
                {/* Left smoke */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: [0, 0.6, 0.3, 0],
                    x: [-50, -100, -150, -200],
                    y: [0, -20, -40, -60],
                    scale: [0.5, 1, 1.5, 2]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-32 left-1/2 w-32 h-32 bg-gradient-to-t from-gray-400/20 to-transparent rounded-full blur-xl"
                />
                
                {/* Right smoke */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: [0, 0.6, 0.3, 0],
                    x: [50, 100, 150, 200],
                    y: [0, -20, -40, -60],
                    scale: [0.5, 1, 1.5, 2]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    delay: 0.8
                  }}
                  className="absolute bottom-32 right-1/2 w-32 h-32 bg-gradient-to-t from-gray-400/20 to-transparent rounded-full blur-xl"
                />
                
                {/* Additional smoke particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 1.5],
                      x: [0, (i % 2 === 0 ? -1 : 1) * (50 + i * 20)],
                      y: [0, -30 - i * 10]
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      ease: "easeOut",
                      delay: 1 + i * 0.2
                    }}
                    className="absolute bottom-40 left-1/2 w-16 h-16 bg-gray-300/10 rounded-full blur-md"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Door container */}
          <div className="relative z-10 mb-12">
            <div className="relative">
              {/* Door glow */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-2xl"
                animate={{
                  scale: doorOpened ? [1, 1.2, 1] : 1,
                  opacity: doorOpened ? [0.5, 1, 0.5] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Door frame */}
              <div className="relative w-80 h-96 bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-lg border-4 border-slate-700 shadow-2xl outline outline-2 outline-slate-600/50">
                {/* Door panels */}
                <div className="absolute inset-4 flex overflow-hidden rounded-md">
                  {/* Left door panel */}
                  <motion.div
                    className="w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border-r-2 border-slate-600 relative outline outline-1 outline-slate-500/30"
                    animate={{
                      rotateY: doorOpened ? -90 : 0,
                    }}
                    style={{
                      transformOrigin: "left center",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute top-1/2 right-4 w-4 h-4 bg-amber-400 rounded-full shadow-lg outline outline-1 outline-amber-300/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600/10 to-transparent rounded-l-md" />
                    {/* Door panel details */}
                    <div className="absolute inset-2 border border-slate-600/30 rounded-sm" />
                  </motion.div>
                  
                  {/* Right door panel */}
                  <motion.div
                    className="w-1/2 bg-gradient-to-bl from-slate-700 via-slate-800 to-slate-900 border-l-2 border-slate-600 relative outline outline-1 outline-slate-500/30"
                    animate={{
                      rotateY: doorOpened ? 90 : 0,
                    }}
                    style={{
                      transformOrigin: "right center",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute top-1/2 left-4 w-4 h-4 bg-amber-400 rounded-full shadow-lg outline outline-1 outline-amber-300/50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600/10 to-transparent rounded-r-md" />
                    {/* Door panel details */}
                    <div className="absolute inset-2 border border-slate-600/30 rounded-sm" />
                  </motion.div>
                </div>
                
                {/* Light behind door - warm golden light */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-300/60 via-yellow-400/40 to-orange-400/60 rounded-lg"
                  animate={{
                    opacity: doorOpened ? [0, 1, 0.8] : 0,
                    scale: doorOpened ? [0.8, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Energy burst - warm white flash */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/80 via-amber-100/70 to-yellow-200/60 rounded-lg"
                  animate={{
                    opacity: doorOpened ? [0, 0.9, 0] : 0,
                    scale: doorOpened ? [0.5, 1.4, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-center max-w-3xl mx-auto px-8"
              >
                {/* Wild Card Title */}
                <motion.div
                  className="mb-8 relative"
                  animate={{
                    textShadow: [
                      "0 0 15px rgba(59, 130, 246, 0.6)",
                      "0 0 25px rgba(147, 51, 234, 0.6)",
                      "0 0 35px rgba(6, 182, 212, 0.6)",
                      "0 0 25px rgba(147, 51, 234, 0.6)",
                      "0 0 15px rgba(59, 130, 246, 0.6)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h1 className="text-8xl font-black mb-2 tracking-wider relative">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent outline-text">
                      WILD
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent opacity-50 blur-sm">
                      WILD
                    </span>
                  </h1>
                  <h1 className="text-8xl font-black tracking-wider relative">
                    <span className="bg-gradient-to-r from-red-400 via-pink-500 via-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent outline-text">
                      CARD
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-500 via-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent opacity-50 blur-sm">
                      CARD
                    </span>
                  </h1>
                </motion.div>
                
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-10 space-y-4"
                >
                  <p className="text-2xl text-gray-300 font-semibold">
                    Projeto Wild Card
                  </p>
                  <p className="text-lg text-gray-400">
                    Os jogadores eliminados têm uma segunda e última chance no Blue Lock
                  </p>
                  <p className="text-xl text-yellow-400 font-bold">
                    Apenas um jogador permanecerá de pé e seguirá para a Fase Dois
                  </p>
                </motion.div>
                
                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex gap-8 justify-center"
                >
                  <Button 
                    onClick={() => handleResponse("accepted")}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-green-400/50 outline outline-2 outline-green-400/30 wildcard-button-glow relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                      animate={{
                        x: [-100, 100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10">
                      {isLoading ? "Processando..." : "✓ ACEITAR DESAFIO"}
                    </span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleResponse("rejected")}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 border-2 border-red-400/50 outline outline-2 outline-red-400/30 wildcard-button-glow relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20"
                      animate={{
                        x: [-100, 100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                    <span className="relative z-10">
                      ✗ RECUSAR E DESISTIR
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}