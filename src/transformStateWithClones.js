'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const historyState = [];

  for (const currentAction of actions) {
    const actionType = currentAction.type;

    switch (actionType) {
      case 'addProperties':
        Object.assign(cloneState, ...[currentAction.extraData]);
        historyState.push({ ...cloneState });
        break;

      case 'removeProperties':
        const keysToRemove = currentAction.keysToRemove;

        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        historyState.push({ ...cloneState });
        break;

      case 'clear':
        for (const key of Object.keys(cloneState)) {
          delete cloneState[key];
        }
        historyState.push({ ...cloneState });
        break;
      default:
        return 'Error with input';
    }
  }

  return historyState;
}

module.exports = transformStateWithClones;
