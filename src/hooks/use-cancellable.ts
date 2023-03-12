import  { useRef } from "react";

const useCancellablePromises = () => {
  const pendingPromises = useRef<any>([]);

  const appendPendingPromise = (promise: any) => {
    pendingPromises.current = [...pendingPromises.current, promise];
  };


  const removePendingPromise = (promise: any) => {
    pendingPromises.current = pendingPromises.current.filter((p:any) => p !== promise);
  }


  const clearPendingPromises = () => pendingPromises.current.map((p:any) => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};

export default useCancellablePromises;
