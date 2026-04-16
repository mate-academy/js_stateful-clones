'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy;

    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...currentState };
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    result.push(stateCopy);
    currentState = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
