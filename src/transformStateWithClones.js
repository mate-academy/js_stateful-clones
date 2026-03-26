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
  const current = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(current, action.extraData);
        result.push({ ...current });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete current[key];
        }
        result.push({ ...current });
        break;

      case 'clear':
        for (const key in current) {
          delete current[key];
        }
        result.push({ ...current });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
