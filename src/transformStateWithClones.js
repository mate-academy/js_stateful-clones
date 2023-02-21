'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const presentState = { ...state };

  for (const objAction in actions) {
    if (actions[objAction].type === 'addProperties') {
      Object.assign(presentState, actions[objAction].extraData);
    } else if (actions[objAction].type === 'removeProperties') {
      for (const key in actions[objAction].keysToRemove) {
        delete presentState[actions[objAction].keysToRemove[key]];
      }
    } else if (actions[objAction].type === 'clear') {
      for (const key in presentState) {
        delete presentState[key];
      }
    }

    result.push({ ...presentState });
  }

  return result;
}

module.exports = transformStateWithClones;
