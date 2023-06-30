'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const newState = Object.assign({}, { ...state });

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      for (const key in extraData) {
        newState[key] = extraData[key];
      }
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
    } else if (type === 'clear') {
      for (const element in newState) {
        delete newState[element];
      }
    }

    const tempState = Object.assign({}, { ...newState });

    arrayOfStates.push(tempState);
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
