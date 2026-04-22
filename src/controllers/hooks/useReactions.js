import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = "post_reactions";

function getReactionsStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveReactionsStorage(allReactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allReactions));
}

export function useReactions() {
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    setReactions(getReactionsStorage());
  }, []);

  const getPostReactions = useCallback((postId) => {
    const postReactions = reactions[postId] || {};
    const counts = {};
    Object.values(postReactions).forEach(reaction => {
      counts[reaction] = (counts[reaction] || 0) + 1;
    });
    return counts;
  }, [reactions]);

  const getUserReaction = useCallback((postId, userId) => {
    if (!userId) return null;
    const postReactions = reactions[postId] || {};
    return postReactions[userId] || null;
  }, [reactions]);

  const setReaction = useCallback((postId, userId, reactionType) => {
    if (!userId) return false;

    try {
      const all = { ...reactions };
      const postReactions = { ...(all[postId] || {}) };

      if (reactionType === null) {
        delete postReactions[userId];
      } else {
        postReactions[userId] = reactionType;
      }

      all[postId] = postReactions;
      saveReactionsStorage(all);
      setReactions(all);
      return true;
    } catch {
      return false;
    }
  }, [reactions]);

  return {
    reactions,
    getPostReactions,
    getUserReaction,
    setReaction
  };
}
