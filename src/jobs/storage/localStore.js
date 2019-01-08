function getItem(property) {
  return JSON.parse(window.localStorage.getItem(property));
}

export const setUser = user => {
  window.localStorage.setItem('user', JSON.stringify(user));
};

export const getLocalStorageUser = () => {
  return getItem('user');
};

export const isLocalStorageEnable = window => {
  return window.localStorage ? true : false;
};

export const retrieveQuestionsFromLocalStorage = () => {
  return getItem('questions');
};

export const retrieveAnwsersFromLocalStorage = () => {
  return getItem('results');
};

export const addItemToLocalStorage = (property, value) => {
  window.localStorage.setItem(property, JSON.stringify(value));
};

export const removeItemsFromLocalStorage = property => {
  delete window.localStorage[property];
};

