'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clone = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      for (const a in actions[action].extraData) {
        clone[a] = actions[action].extraData[a];
      }
    }

    if (actions[action].type === 'removeProperties') {
      for (const remove in actions[action].keysToRemove) {
        delete clone[actions[action].keysToRemove[remove]];
      }
    }

    if (actions[action].type === 'clear') {
      clone = {};
    }
    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
