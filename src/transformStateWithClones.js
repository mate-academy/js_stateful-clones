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
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(clonedState, actions[key].extraData);
        break;

      case 'removeProperties':
        for (const del of actions[key].keysToRemove) {
          delete clonedState[del];
        }
        break;

      case 'clear':
        for (const k in clonedState) {
          delete clonedState[k];
        }
        break;
    }
    result.push(Object.assign({}, clonedState));
  }

  return result;
}

module.exports = transformStateWithClones;
