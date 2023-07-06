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
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const stateCopy = { ...currentState };

    switch (type) {
      case ActionType.AddProperties:
        Object.assign(stateCopy, extraData);
        break;
      case ActionType.RemoveProperties:
        for (const key of keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        break;
      case ActionType.Clear:
        const keys = Object.keys(stateCopy);

        for (const key of keys) {
          delete stateCopy[key];
        }
        break;
      default:
        break;
    }

    result.push(stateCopy);
    currentState = stateCopy;
  }

  return result;
}

module.exports = transformStateWithClones;
