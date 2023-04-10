'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    result[i] = Object.assign({}, newState);
  }

  return result;
}

module.exports = transformStateWithClones;
