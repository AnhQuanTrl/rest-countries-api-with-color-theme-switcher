import React from "react";

const useMediaQuery = (query: string) => {
  const subscribe = (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  };
  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };
  return React.useSyncExternalStore<boolean>(subscribe, getSnapshot);
};

export default useMediaQuery;
