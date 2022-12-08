'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cpState = { ...state };
  const states = [];

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        Object.assign(cpState, actions[action].extraData);
        break;
      case 'removeProperties':
        for (const key of actions[action].keysToRemove) {
          delete cpState[key];
        }
        break;
      case 'clear':
        for (const key in cpState) {
          delete cpState[key];
        }
        break;
      default:
        return 'Some generic error handling message';
    }
    states.push({ ...cpState });
  }

  return states;
}

module.exports = transformStateWithClones;
