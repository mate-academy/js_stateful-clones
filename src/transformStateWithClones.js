'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          stateCopy[key] = value;
        }
        break;
      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          if (removeKey in stateCopy) {
            delete stateCopy[removeKey];
          }
        }
        break;
      default:
        break;
    }
    transformHistory.push(Object.assign({}, stateCopy));
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
