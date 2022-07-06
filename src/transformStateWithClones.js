'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateNew = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateNew[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateNew) {
            delete stateNew[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateNew) {
          delete stateNew[key];
        }
        break;

      default:
        throw new Error('error');
    }
    states.push({ ...stateNew });
  }

  return states;
}

module.exports = transformStateWithClones;
