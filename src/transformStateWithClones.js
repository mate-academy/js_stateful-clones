'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateNow = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateNow, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateNow[key];
        }
        break;

      case 'clear':
        Object.keys(stateNow).forEach((key) => delete stateNow[key]);
        break;

      default:
        break;
    }

    states.push({ ...stateNow });
  }

  return states;
}

module.exports = transformStateWithClones;
