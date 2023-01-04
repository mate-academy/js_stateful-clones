'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (const action in actions) {
    const actionToDo = actions[action];

    switch (actionToDo.type) {
      case 'addProperties':
        Object.assign(newState, actionToDo.extraData);
        break;

      case 'removeProperties':
        for (const key in actionToDo.keysToRemove) {
          const toDelete = actionToDo.keysToRemove[key];

          delete newState[toDelete];
        }
        break;

      case 'clear':
        for (const property in newState) {
          delete newState[property];
        }
        break;

      default :
        throw new Error('action type was not found');
    }
    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
