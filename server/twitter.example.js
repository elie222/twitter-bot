// we like all tweets with following words in them
export const statuses = [
  'ico',
  'crypto',
  'bitcoin',
  '#ethereum',
];

// we also respond to all tweets from these users
// (only if they contain the words above in them)
export const respondList = [
  'Bitcoin', // @Bitcoin
  'ethereumproject', // @ethereumproject
];

// we randomly choose a response message from this array when responding
export const responseMessages = [
  'Check out our amazing dapp at amazingdapp.com!',
  'Not as good as amazingdapp.com!',
  (handle) => `@${handle} check out @AmazingDappMan https://amazingdapp.com`,
  (handle) => `@${handle} yes!`,
];
