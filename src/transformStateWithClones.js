'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        newState = { ...newState, ...actions[i].extraData };
        break;
      }

      case 'removeProperties': {
        newState = { ...newState };

        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
