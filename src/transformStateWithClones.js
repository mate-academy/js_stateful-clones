'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = Object.assign({}, state);

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result[result.length] = Object.assign({}, newState);
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete newState[property];
        }
        result[result.length] = Object.assign({}, newState);
        break;
      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
        result[result.length] = Object.assign({}, newState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
