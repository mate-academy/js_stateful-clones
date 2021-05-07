'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  const newState = { ...state };

  for (const object of actions) {
    const { extraData, keysToRemove, type } = object;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const keyOfRemove of keysToRemove) {
          delete newState[keyOfRemove];
        }
        break;

      case 'clear':
        for (const keyOfState in newState) {
          delete newState[keyOfState];
        }
    }
    newActions.push({ ...newState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
