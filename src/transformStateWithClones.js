'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clonedState = Object.assign({}, state);

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(clonedState, actions[key].extraData);
      result.push(Object.assign({}, clonedState));
    }

    if (actions[key].type === 'removeProperties') {
      for (const del of actions[key].keysToRemove) {
        delete clonedState[del];
      }
      result.push(Object.assign({}, clonedState));
    }

    if (actions[key].type === 'clear') {
      for (const k in clonedState) {
        delete clonedState[k];
      }
      result.push(Object.assign({}, clonedState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
