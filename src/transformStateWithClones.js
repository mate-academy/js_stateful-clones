'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let currentState = state;

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    stateArray.push(stateCopy);
    currentState = stateCopy;
  }

  return stateArray;
}

module.exports = transformStateWithClones;
