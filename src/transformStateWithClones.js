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

  for (const item of actions) {
    let stateCopy = { ...currentState };

    switch (item.type) {
      case 'addProperties':
        Object.assign(stateCopy, item.extraData);
        break;

      case 'removeProperties':
        for (const el of item.keysToRemove) {
          delete stateCopy[el];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${item.type}`);
    }
    result.push(stateCopy);
    currentState = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
