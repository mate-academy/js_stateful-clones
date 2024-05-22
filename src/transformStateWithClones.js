'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let modifiedState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        modifiedState = { ...modifiedState, ...action.extraData };
        result.push({ ...modifiedState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        result.push(modifiedState);
        break;
      case 'clear':
        modifiedState = {};
        result.push(modifiedState);
        break;
      default:
        return;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
