'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  let newState = { ...state };

  for (const object of actions) {
    const finalyState = { ...newState };
    const { extraData, keysToRemove, type } = object;

    if (type === 'addProperties') {
      Object.assign(finalyState, extraData);
    }

    if (type === 'removeProperties') {
      for (const keyOfRemove of keysToRemove) {
        delete finalyState[keyOfRemove];
      }
    }

    if (type === 'clear') {
      for (const keyOfState in finalyState) {
        delete finalyState[keyOfState];
      }
    }
    newActions.push(finalyState);
    newState = finalyState;
  }

  return newActions;
}

module.exports = transformStateWithClones;
