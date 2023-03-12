import useCancellablePromises from './use-cancellable';

// const useClickPreventionOnDoubleClick = (onClick: any, onDoubleClick: any) => {
//   const api = useCancellablePromises();
//
//   const handleClick = () => {
//     api.clearPendingPromises();
//     const waitForClick = 300;
//     api.appendPendingPromise(waitForClick);
//
//     return waitForClick.promise
//       .then(() => {
//         api.removePendingPromise(waitForClick);
//         onClick();
//       })
//       .catch((errorInfo: any) => {
//         api.removePendingPromise(waitForClick);
//         if (!errorInfo.isCanceled) {
//           throw errorInfo.error;
//         }
//       });
//   };

//   const handleDoubleClick = () => {
//     api.clearPendingPromises();
//     onDoubleClick();
//   };
//
//   return [handleClick, handleDoubleClick];
// };
//
// export default useClickPreventionOnDoubleClick;
