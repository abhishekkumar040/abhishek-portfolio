// import React, { useState, useEffect } from 'react';
// import { Volume2, VolumeX } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { soundEngine } from '../utils/soundEffects';
// import { useTheme } from '../context/ThemeContext';

// export const SoundToggle: React.FC = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const { isDark } = useTheme();

//   const toggleSound = () => {
//     const nextState = !isMuted;
//     setIsMuted(nextState);
//     soundEngine.setMuted(nextState);
//     if (!nextState) {
//       soundEngine.playScrollTick(2);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       soundEngine.handleScroll(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={toggleSound}
//       title={isMuted ? 'Unmute scroll sound effects' : 'Mute scroll sound effects'}
//       aria-label={isMuted ? 'Unmute scroll sounds' : 'Mute scroll sounds'}
//       className={`relative flex items-center justify-center p-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
//         isDark
//           ? 'border-[#D7E2EA]/20 bg-[#16181C]/80 text-[#D7E2EA] hover:bg-[#22252A] hover:border-white/40'
//           : 'border-[#0C0C0C]/15 bg-[#FFFFFF]/80 text-[#0C0C0C] hover:bg-[#F1F3F5] hover:border-black/30'
//       }`}
//     >
//       {isMuted ? (
//         <VolumeX className="w-4 h-4 opacity-60" />
//       ) : (
//         <div className="flex items-center gap-1">
//           <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
//           <div className="flex items-end gap-0.5 h-3">
//             <span className="w-0.5 h-full bg-cyan-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
//             <span className="w-0.5 h-2/3 bg-blue-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
//             <span className="w-0.5 h-full bg-purple-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
//           </div>
//         </div>
//       )}
//     </motion.button>
//   );
// };
