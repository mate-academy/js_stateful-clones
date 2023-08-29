'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  const stateVersion = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD: {
        const { extraData } = action;
        
        Object.assign(stateVersion, extraData);
        break;
      }

      case REMOVE: {
        for (const key of action.keysToRemove) {
          delete stateVersion[key];
        }
        break;
      }

      case CLEAR: {
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
