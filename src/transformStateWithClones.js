'use strict';

function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const cloneState = { ...state };

  for (const elem of actions) {
    const { type, keysToRemove, extraData } = elem;

    if (type === 'addProperties') {
      Object.assign(cloneState, extraData);
    };

    if (type === 'removeProperties') {
      for (const value of keysToRemove) {
        delete cloneState[value];
      };
    };

    if (type === 'clear') {
      Object.keys(cloneState).forEach((el) => {
        delete cloneState[el];
      });
    }
    arrayResult.push({ ...cloneState });
  };

  return arrayResult;
};

module.exports = transformStateWithClones;
