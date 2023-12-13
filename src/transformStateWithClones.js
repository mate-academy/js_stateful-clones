'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newState, action.extraData);
        states.push({ ...newState });
        break;
      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        states.push({ ...newState });
        break;

      case 'clear' :
        for (const key in newState) {
          delete newState[key];
        }
        states.push({ ...newState });
        break;

      default:
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
