'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (let i = 0; i < actions.length; i++) {
    const STATE_CLONE = { ...currentState };

    switch (actions[i].type) {
      case 'addProperties':
        for (const key of Object.keys(actions[i].extraData)) {
          STATE_CLONE[key] = actions[i].extraData[key];
        }

        result.push({ ...STATE_CLONE });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete STATE_CLONE[key];
        }

        result.push({ ...STATE_CLONE });
        break;

      case 'clear':
        for (const key of Object.keys(STATE_CLONE)) {
          delete STATE_CLONE[key];
        }
        result.push({});
        break;

      default:
        throw new Error(`Unknown action type: ${actions[i].type}`);
    }

    currentState = STATE_CLONE;
  }

  return result;
}

module.exports = transformStateWithClones;
