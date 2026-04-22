import { useState, useRef } from "react";
import { REACTIONS } from "../../../models/reactions";

export default function ReactionPicker({ reactions, userReaction, onReact, totalReactions }) {
  const [showPicker, setShowPicker] = useState(false);
  const hoverTargetRef = useRef(null); // "button" | "picker" | null
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleButtonEnter = () => {
    clearCloseTimer();
    hoverTargetRef.current = "button";
    setShowPicker(true);
  };

  const handleButtonLeave = () => {
    hoverTargetRef.current = null;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      if (hoverTargetRef.current === null) {
        setShowPicker(false);
      }
    }, 200);
  };

  const handlePickerEnter = () => {
    clearCloseTimer();
    hoverTargetRef.current = "picker";
  };

  const handlePickerLeave = () => {
    hoverTargetRef.current = null;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      if (hoverTargetRef.current === null) {
        setShowPicker(false);
      }
    }, 200);
  };

  const handleReact = (reactionName) => {
    onReact(reactionName);
    setShowPicker(false);
    hoverTargetRef.current = null;
    clearCloseTimer();
  };

  const getMainReaction = () => {
    if (userReaction) {
      return REACTIONS.find(r => r.name === userReaction);
    }
    return REACTIONS[0]; // Default to like
  };

  const mainReaction = getMainReaction();

  // Get top 3 reactions to display
  const getTopReactions = () => {
    if (!reactions || Object.keys(reactions).length === 0) return [];
    return Object.entries(reactions)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => REACTIONS.find(r => r.name === name)?.emoji)
      .filter(Boolean);
  };

  const topReactions = getTopReactions();

  return (
    <div className="relative">
      {/* Picker popup - positioned above button */}
      {showPicker && (
        <div 
          className="absolute bottom-full left-0 mb-2 flex gap-1 p-2 bg-white rounded-full shadow-xl border border-gray-200 z-50"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
          onMouseEnter={handlePickerEnter}
          onMouseLeave={handlePickerLeave}
        >
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.name}
              onClick={() => handleReact(reaction.name)}
              className="text-2xl hover:scale-125 transition-transform duration-150 p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              title={reaction.label}
              type="button"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {/* Main reaction button */}
      <div className="flex items-center gap-2">
        <button
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
          onClick={() => handleReact(userReaction ? null : "like")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
            userReaction 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
          type="button"
        >
          <span className="text-xl">{mainReaction?.emoji}</span>
          <span className="capitalize">{userReaction ? mainReaction?.label : "Curtir"}</span>
        </button>

        {/* Reactions summary */}
        {totalReactions > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              {topReactions.map((emoji, idx) => (
                <span 
                  key={idx} 
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-sm border-2 border-gray-800 shadow-sm"
                >
                  {emoji}
                </span>
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium ml-1">
              {totalReactions}
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
