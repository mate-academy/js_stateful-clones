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
  let copyStates = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(copyStates, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyStates[key];
        }
        break;

      case 'clear':
        copyStates = {};
        break;
      default:
        return 'Error';
    }

    states.push({ ...copyStates });
  }

  return states;
}

module.exports = transformStateWithClones;
