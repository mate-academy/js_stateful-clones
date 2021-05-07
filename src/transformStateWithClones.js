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
    const { extraData, keysToRemove, type } = object;
    const finalyState = { ...newState };

    switch (type) {
      case 'addProperties':
        Object.assign(finalyState, extraData);
        break;

      case 'removeProperties':
        for (const keyOfRemove of keysToRemove) {
          delete finalyState[keyOfRemove];
        }
        break;

      case 'clear':
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
