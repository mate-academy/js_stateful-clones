'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionSteps = [];
  let currentState = { ...state };
  const add = 'addProperties';
  const del = 'removeProperties';
  const clear = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(currentState, action.extraData);
        break;

      case del:
        for (const removeKey of action.keysToRemove) {
          delete currentState[removeKey];
        }
        break;

      case clear:
        currentState = {};
        break;

      default:
        return null;
    }

    actionSteps.push({ ...currentState });
  }

  return actionSteps;
}
module.exports = transformStateWithClones;
