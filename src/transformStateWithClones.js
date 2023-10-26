'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneState = Object.assign({}, state);
  const result = [];
  const actionsLength = actions.length;

  for (let i = 0; i < actionsLength; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(cloneState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      const keysToRemoveLength = actions[i].keysToRemove.length;

      for (let j = 0; j < keysToRemoveLength; j++) {
        if (cloneState.hasOwnProperty(actions[i].keysToRemove[j])) {
          delete cloneState[actions[i].keysToRemove[j]];
        }
      }
    } else if (actions[i].type === 'clear') {
      for (const key in cloneState) {
        delete cloneState[key];
      }
    }

    result.push(Object.assign({}, cloneState));
  }

  return result;
}

module.exports = transformStateWithClones;
