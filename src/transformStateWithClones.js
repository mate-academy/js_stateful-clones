'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case 'clear': {
        for (const clearKey in stateCopy) {
          delete stateCopy[clearKey];
        }
        break;
      }

      default:
        throw new Error();
    }
    result.push(stateCopy);
    currentState = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
