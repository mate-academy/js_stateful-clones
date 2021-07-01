'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const types = [];
  const copyState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(copyState, actions[i].extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete copyState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      }
    }
    types.push({ ...copyState });
  }

  return types;
}

module.exports = transformStateWithClones;
