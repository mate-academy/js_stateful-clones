'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ActionType = {
  AddProperties: 'addProperties',
  RemoveProperties: 'removeProperties',
  Clear: 'clear',
};

function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ActionType.AddProperties:
        Object.assign(currentState, extraData);
        break;
      case ActionType.RemoveProperties:
        for (const key of keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;
      case ActionType.Clear:
        const keys = Object.keys(currentState);

        for (const key of keys) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
