'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['extraData']) {
      for (const keys in actions[i]['extraData']) {
        newObj[keys] = actions[i]['extraData'][keys];
      }
    } else if (actions[i]['keysToRemove']) {
      for (const values of actions[i]['keysToRemove']) {
        delete newObj[values];
      }
    } else if (actions[i]['type'] === 'clear') {
      for (const deleted in newObj) {
        delete newObj[deleted];
      }
    }
    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;
