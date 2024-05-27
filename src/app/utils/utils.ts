/**
 * Generates a unique identifier by combining a random string and the current timestamp.
 */
export const generateId = (): string => {
  const random = Math.random().toString(36).substring(2).slice(0, 3);
  const date = Date.now().toString(36);
  
  return `${ random }${ date.slice(date.length - 3, date.length) }`;
};
