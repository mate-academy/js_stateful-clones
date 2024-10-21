'use strict';

/**
 * @param {Object} state - The initial state object.
 * @param {Object[]} actions - The actions to be applied on the state.
 *
 * @return {Object[]} - An array of cloned states after each action.
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateCopy = { ...state };

  for (const { type, ...rest } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, rest.extraData);
        break;

      case 'removeProperties':
        for (const key of rest.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    const clonedState = { ...stateCopy };

    array.push(clonedState);
  }

  return array;
}

module.exports = transformStateWithClones;
