'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const current = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in current) {
          delete current[key];
        }
        break;

      case 'addProperties':
        Object.assign(current, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete current[key];
        }
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;
