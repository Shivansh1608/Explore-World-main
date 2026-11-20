import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("explore_world_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("explore_world_bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.warn("Failed to persist bookmarks:", e);
    }
  }, [bookmarks]);

  const toggleBookmark = (destination) => {
    const destId = destination._id || destination.id;
    setBookmarks((prev) => {
      const exists = prev.some((item) => (item._id || item.id) === destId);
      if (exists) {
        return prev.filter((item) => (item._id || item.id) !== destId);
      } else {
        const itemToSave = {
          _id: destId,
          id: destId,
          name: destination.name,
          category: destination.category,
          city: destination.city,
          country: destination.country,
          location: destination.location,
          rating: destination.rating || 4.8,
          price: destination.price || (destination.estimatedBudget ? `₹${destination.estimatedBudget.toLocaleString()}` : "₹25,000"),
          estimatedBudget: destination.estimatedBudget,
          image: destination.images?.[0]?.url || destination.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
          savedAt: new Date().toISOString(),
        };
        return [itemToSave, ...prev];
      }
    });
  };

  const isBookmarked = (id) => {
    if (!id) return false;
    return bookmarks.some((item) => (item._id || item.id) === id);
  };

  const clearBookmarks = () => setBookmarks([]);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarkProvider");
  }
  return context;
}
