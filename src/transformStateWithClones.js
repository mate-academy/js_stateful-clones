'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const cloneState = { ...state };

  for (const action of actions) {
    transformState(cloneState, action);
    arr.push({ ...cloneState });
  }

  return arr;
}

module.exports = transformStateWithClones;

function transformState(state, actions) {
  const type = actions.type;

  switch (type) {
    case 'addProperties':
      for (const key in actions.extraData) {
        state[key] = actions.extraData[key];
      }
      break;

    case 'removeProperties':
      for (const value of actions.keysToRemove) {
        delete state[value];
      }
      break;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }
      break;
    default:
      return 'Error';
  }
}
