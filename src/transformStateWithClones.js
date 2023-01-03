'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = Object.assign({}, state);
  const arr = [];

  for (let action of actions) {
    switch (action.type) {
      case ('clear'):
        for (const prop in copyOfState) {
          delete copyOfState[prop];
        }
        break;
      case ('addProperties'):
        Object.assign(copyOfState, action.extraData);
        break;
      case ('removeProperties'):
        for (const prop of action.keysToRemove) {
          delete copyOfState[prop];
        }
        break;
      default:
        action = null;
    }
    arr.push(Object.assign({}, copyOfState));
  }

  return arr;
}
module.exports = transformStateWithClones;
