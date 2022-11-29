'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(actionState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete actionState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in actionState) {
          delete actionState[key];
        }
        break;

      default:
        continue;
    }
    history.push({ ...actionState });
  }

  return history;
}

module.exports = transformStateWithClones;
