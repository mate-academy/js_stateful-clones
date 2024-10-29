'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const act of actions) {
    let modifiedState = { ...currentState };

    switch (act.type) {
      case 'addProperties':
        Object.assign(modifiedState, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        modifiedState = {};
        break;

      default:
        return 'error';
    }

    currentState = modifiedState;
    result.push(modifiedState);
  }

  return result;
}

module.exports = transformStateWithClones;
