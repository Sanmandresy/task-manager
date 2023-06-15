/**
  Pauses the execution for a specified amount of time.
  @param {number} milliseconds - The duration to wait in milliseconds.
  @returns {Promise<void>} A Promise that resolves after the specified duration.
*/
const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export { wait };
