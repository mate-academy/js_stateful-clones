'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const removeItem of action.keysToRemove) {
          delete newState[removeItem];
        }
        break;
      case 'clear':
        Object.keys(newState)
          .forEach(objectValue => delete newState[objectValue]);
        break;
      default:
        throw new Error(`Incorrect value: ${action.type}`);
    }

    arrayOfStates.push({ ...newState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
