'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        result.push(Object.assign({}, newState));
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }
        result.push(Object.assign({}, newState));
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        result.push(Object.assign({}, newState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
