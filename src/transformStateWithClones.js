'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const currentState = { ...state };

  actions.forEach((elem) => {
    if (elem.type === 'addProperties') {
      Object.keys(elem.extraData).forEach((extraKey) => {
        currentState[extraKey] = elem.extraData[extraKey];
      });
      resultArray.push({ ...currentState });
    }

    if (elem.type === 'removeProperties') {
      elem.keysToRemove.forEach((removeKey) => {
        delete currentState[removeKey];
      });
      resultArray.push({ ...currentState });
    }

    if (elem.type === 'clear') {
      Object.keys(currentState).forEach((key) => {
        delete currentState[key];
      });
      resultArray.push({ ...currentState });
    }
  });

  return resultArray;
}

module.exports = transformStateWithClones;
