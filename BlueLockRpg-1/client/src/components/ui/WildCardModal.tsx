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
      <DialogContent className="max-w-5xl w-[85vw] h-[85vh] bg-black border-0 text-white overflow-hidden p-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-describedby="wildcard-description">
        <DialogTitle className="sr-only">Wild Card Invitation</DialogTitle>
        <div className="sr-only">
          <p id="wildcard-description">You have received a Wild Card invitation for a second chance in Blue Lock</p>
        </div>
        <div className="relative h-full flex flex-col items-center justify-start pt-8 wildcard-cinematic-bg overflow-hidden">
          {/* Cinematic background with floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating geometric shapes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100],
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Electric particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`electric-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, Math.random() * 60 - 30],
                  y: [0, Math.random() * 60 - 30],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Cinematic energy wave effects */}
          <AnimatePresence>
            {doorOpened && (
              <>
                {/* Central energy burst */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0.4, 0],
                    scale: [0, 3, 6, 10],
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                  className="absolute inset-0 bg-gradient-radial from-cyan-400/20 via-purple-400/10 to-transparent rounded-full blur-2xl"
                />
                
                {/* Expanding ring effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.6, 0],
                      scale: [0, 2 + i * 0.8],
                    }}
                    transition={{
                      duration: 1.5 + i * 0.3,
                      ease: "easeOut",
                      delay: 0.5 + i * 0.2
                    }}
                    className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400/30 rounded-full"
                  />
                ))}
                
                {/* Floating debris particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.7, 0],
                      scale: [0, 1, 0.5],
                      x: [0, (i % 2 === 0 ? -1 : 1) * (100 + i * 20)],
                      y: [0, -50 - i * 15],
                      rotate: [0, 360 + i * 45]
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      ease: "easeOut",
                      delay: 1 + i * 0.1
                    }}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Cinematic Portal Container */}
          <div className="relative z-10 mb-4">
            <div className="relative">
              {/* Portal outer glow */}
              <motion.div
                className="absolute -inset-12 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-400/20 rounded-full blur-3xl"
                animate={{
                  scale: doorOpened ? [1, 1.3, 1.1] : 1,
                  opacity: doorOpened ? [0.3, 0.8, 0.6] : 0.2,
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
              />
              
              {/* Portal frame - more futuristic */}
              <div className="relative w-80 h-96 bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-2xl border-4 border-gradient-to-r from-cyan-400/50 to-purple-400/50 shadow-2xl shadow-cyan-500/20 wildcard-portal-glow">
                {/* Hexagonal tech pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_40%,rgba(6,182,212,0.1)_50%,transparent_60%)] rounded-2xl" />
                
                {/* Portal entrance */}
                <div className="absolute inset-3 flex overflow-hidden rounded-xl">
                  {/* Left portal panel */}
                  <motion.div
                    className="w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border-r border-cyan-400/30 relative"
                    animate={{
                      rotateY: doorOpened ? -120 : 0,
                    }}
                    style={{
                      transformOrigin: "left center",
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Tech details */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4] animate-pulse" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_8px_#a855f7] animate-pulse" style={{animationDelay: "0.5s"}} />
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent rounded-l-xl" />
                    <div className="absolute inset-2 border border-cyan-400/20 rounded-lg" />
                  </motion.div>
                  
                  {/* Right portal panel */}
                  <motion.div
                    className="w-1/2 bg-gradient-to-bl from-slate-700 via-slate-800 to-slate-900 border-l border-purple-400/30 relative"
                    animate={{
                      rotateY: doorOpened ? 120 : 0,
                    }}
                    style={{
                      transformOrigin: "right center",
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Tech details */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7] animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4] animate-pulse" style={{animationDelay: "0.3s"}} />
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-400/5 to-transparent rounded-r-xl" />
                    <div className="absolute inset-2 border border-purple-400/20 rounded-lg" />
                  </motion.div>
                </div>
                
                {/* Portal energy core */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-300/40 via-purple-400/30 to-pink-400/40 rounded-2xl"
                  animate={{
                    opacity: doorOpened ? [0, 0.9, 0.7] : 0,
                    scale: doorOpened ? [0.9, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Dimensional rift effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/60 via-cyan-200/50 to-purple-200/50 rounded-2xl"
                  animate={{
                    opacity: doorOpened ? [0, 1, 0] : 0,
                    scale: doorOpened ? [0.8, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                />
                
                {/* Dramatic Mist/Smoke Effects after door opens */}
                <AnimatePresence>
                  {doorOpened && (
                    <>
                      {/* Left side dramatic mist */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`left-mist-${i}`}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 0.7, 0.4, 0],
                            scale: [0.3, 1.5, 2.5, 3.5],
                            x: [-150 - i * 30, -250 - i * 40, -350 - i * 50],
                            y: [10 + i * 5, -20 - i * 15, -50 - i * 25],
                          }}
                          transition={{
                            duration: 4 + i * 0.3,
                            ease: "easeOut",
                            delay: 1.2 + i * 0.1
                          }}
                          className="absolute bottom-0 left-1/2 w-24 h-24 bg-gradient-to-t from-gray-300/20 via-gray-400/15 to-transparent rounded-full blur-xl"
                        />
                      ))}
                      
                      {/* Right side dramatic mist */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`right-mist-${i}`}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 0.7, 0.4, 0],
                            scale: [0.3, 1.5, 2.5, 3.5],
                            x: [150 + i * 30, 250 + i * 40, 350 + i * 50],
                            y: [10 + i * 5, -20 - i * 15, -50 - i * 25],
                          }}
                          transition={{
                            duration: 4 + i * 0.3,
                            ease: "easeOut",
                            delay: 1.4 + i * 0.1
                          }}
                          className="absolute bottom-0 right-1/2 w-24 h-24 bg-gradient-to-t from-gray-300/20 via-gray-400/15 to-transparent rounded-full blur-xl"
                        />
                      ))}
                      
                      {/* Central rising mist */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`center-mist-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 0.5, 0.3, 0],
                            scale: [0.5, 2, 3, 4],
                            y: [0, -80 - i * 20, -150 - i * 30],
                          }}
                          transition={{
                            duration: 3.5 + i * 0.2,
                            ease: "easeOut",
                            delay: 1.6 + i * 0.15
                          }}
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-t from-white/10 via-gray-200/8 to-transparent rounded-full blur-2xl"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Cinematic Content */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.8 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 text-center max-w-4xl mx-auto px-6 flex-1 flex flex-col justify-center"
              >
                {/* Cinematic Wild Card Title */}
                <motion.div
                  className="mb-6 relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-400/20 rounded-3xl blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Epic Blue Lock Style Title */}
                    <div className="relative">
                      {/* Dramatic background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-full blur-3xl scale-150"
                        animate={{
                          scale: [1.2, 1.8, 1.2],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <h1 className="text-8xl md:text-9xl font-black mb-1 tracking-wider relative">
                        <motion.span 
                          className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent relative z-10 font-orbitron"
                          style={{
                            textShadow: "0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                            WebkitTextStroke: "2px rgba(0, 0, 0, 0.8)"
                          }}
                          animate={{
                            textShadow: [
                              "0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                              "0 0 50px rgba(239, 68, 68, 1), 0 0 100px rgba(251, 146, 60, 0.8)",
                              "0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          WILD
                        </motion.span>
                      </h1>
                      <h1 className="text-8xl md:text-9xl font-black tracking-wider relative">
                        <motion.span 
                          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text text-transparent relative z-10 font-orbitron"
                          style={{
                            textShadow: "0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(239, 68, 68, 0.6)",
                            WebkitTextStroke: "2px rgba(0, 0, 0, 0.8)"
                          }}
                          animate={{
                            textShadow: [
                              "0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(239, 68, 68, 0.6)",
                              "0 0 50px rgba(251, 191, 36, 1), 0 0 100px rgba(239, 68, 68, 0.8)",
                              "0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(239, 68, 68, 0.6)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3,
                          }}
                        >
                          CARD
                        </motion.span>
                      </h1>
                    </div>
                    
                    {/* Subtitle effect */}
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs tracking-[0.3em] text-cyan-400/60 font-mono"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      PROJECT WILD CARD
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Dramatic Blue Lock Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mb-6 space-y-6"
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl blur-xl"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="relative z-10 p-6 space-y-4">
                      <motion.p 
                        className="text-2xl text-red-400 font-bold tracking-wide font-orbitron"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(239, 68, 68, 0.6)",
                            "0 0 20px rgba(239, 68, 68, 0.8)",
                            "0 0 10px rgba(239, 68, 68, 0.6)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        PROJETO WILD CARD
                      </motion.p>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        A última chance dos eliminados. Uma oportunidade final para provar seu valor no Blue Lock.
                      </p>
                      <motion.p 
                        className="text-xl text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text font-bold font-orbitron"
                        style={{
                          textShadow: "0 0 20px rgba(251, 191, 36, 0.8)"
                        }}
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(251, 191, 36, 0.8)",
                            "0 0 30px rgba(251, 146, 60, 0.8)",
                            "0 0 40px rgba(239, 68, 68, 0.8)",
                            "0 0 30px rgba(251, 146, 60, 0.8)",
                            "0 0 20px rgba(251, 191, 36, 0.8)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        APENAS UM SOBREVIVERÁ
                      </motion.p>
                      <p className="text-base text-gray-400 italic">
                        "Devore ou seja devorado. Esta é a essência do Blue Lock."
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Epic Blue Lock Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                  <Button 
                    onClick={() => handleResponse("accepted")}
                    disabled={isLoading}
                    className="relative group bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 text-white px-12 py-5 text-xl font-bold shadow-2xl hover:shadow-green-500/60 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-4 border-green-400/60 rounded-2xl overflow-hidden font-orbitron"
                  >
                    {/* Intense energy sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-300/40 via-emerald-300/40 to-teal-300/40"
                      animate={{
                        x: [-300, 300],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Pulsing border effect */}
                    <motion.div
                      className="absolute inset-0 border-4 border-green-400/0 rounded-2xl"
                      animate={{
                        borderColor: ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 1)", "rgba(34, 197, 94, 0)"],
                        boxShadow: [
                          "0 0 0px rgba(34, 197, 94, 0)",
                          "0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(34, 197, 94, 0.4)",
                          "0 0 0px rgba(34, 197, 94, 0)"
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-3xl">⚡</span>
                      {isLoading ? "PROCESSANDO..." : "ACEITAR DESAFIO"}
                    </span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleResponse("rejected")}
                    disabled={isLoading}
                    className="relative group bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 text-white px-12 py-5 text-xl font-bold shadow-2xl hover:shadow-red-500/60 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-4 border-red-400/60 rounded-2xl overflow-hidden font-orbitron"
                  >
                    {/* Intense energy sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-300/40 via-rose-300/40 to-pink-300/40"
                      animate={{
                        x: [-300, 300],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                    
                    {/* Pulsing border effect */}
                    <motion.div
                      className="absolute inset-0 border-4 border-red-400/0 rounded-2xl"
                      animate={{
                        borderColor: ["rgba(248, 113, 113, 0)", "rgba(248, 113, 113, 1)", "rgba(248, 113, 113, 0)"],
                        boxShadow: [
                          "0 0 0px rgba(248, 113, 113, 0)",
                          "0 0 40px rgba(248, 113, 113, 0.8), 0 0 80px rgba(248, 113, 113, 0.4)",
                          "0 0 0px rgba(248, 113, 113, 0)"
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-3xl">💀</span>
                      DESISTIR E MORRER
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
