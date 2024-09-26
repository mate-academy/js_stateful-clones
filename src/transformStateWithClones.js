'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const logs = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete currentState[remove];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('wrong action type');
    }

    logs.push({ ...currentState });
  }

  return logs;
}

module.exports = transformStateWithClones;
