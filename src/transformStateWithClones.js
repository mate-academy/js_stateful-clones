'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateVersion = { ...state };

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties': {
        Object.assign(stateVersion, actions[action].extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of actions[action].keysToRemove) {
          delete stateVersion[key];
        }
        break;
      }

      case 'clear': {
        for (const key in stateVersion) {
          delete stateVersion[key];
        }
        break;
      }

      default: return 'Please enter valid actions';
    }

    result.push({ ...stateVersion });
  }

  return result;
}

module.exports = transformStateWithClones;
