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
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        history.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        history.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};
        history.push({ ...currentState });
        break;

      default:
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
