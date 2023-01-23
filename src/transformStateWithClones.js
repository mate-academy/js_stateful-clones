'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clonedState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(clonedState, actions[i].extraData);
      result.push(Object.assign({}, clonedState));
    } else if (actions[i].type === 'removeProperties') {
      const arr = actions[i].keysToRemove;

      for (let k = 0; k < arr.length; k++) {
        delete clonedState[arr[k]];
      }

      result.push(Object.assign({}, clonedState));
    } else if (actions[i].type === 'clear') {
      for (const key in clonedState) {
        if (clonedState.hasOwnProperty(key)) {
          delete clonedState[key];
        }
      }

      result.push(Object.assign({}, clonedState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
