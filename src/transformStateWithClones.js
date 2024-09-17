'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateCopies = [];

  const ActionType = {
    AddProperties: 'addProperties',
    RemoveProperties: 'removeProperties',
    Clear: 'clear',
  };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case ActionType.AddProperties:
        Object.assign(newState, action.extraData);
        break;

      case ActionType.RemoveProperties:
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;

      case ActionType.Clear:
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        continue;
    }
    stateCopies.push({ ...newState });
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
