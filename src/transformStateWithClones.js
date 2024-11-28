'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;
      default:
        return 'Error';
    }
    history.push({ ...currentState });
  }

  function removeProperties(obj, keys) {
    const result = { ...obj };

    for (const key of keys) {
      if (key in result) {
        delete result[key];
      }
    }

    return result;
  }

  return history;
}

module.exports = transformStateWithClones;
