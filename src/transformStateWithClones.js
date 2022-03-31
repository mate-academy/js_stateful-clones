'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const steteItems = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        for (const key in action.extraData) {
          steteItems[key] = action.extraData[key];
        }
        break;

      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete steteItems[key];
        }
        break;

      case action.type === 'clear':
        for (const key in steteItems) {
          delete steteItems[key];
        }
        break;
    }

    result.push({ ...steteItems });
  }

  return result;
}

module.exports = transformStateWithClones;
