export const asyncTimeOut = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
