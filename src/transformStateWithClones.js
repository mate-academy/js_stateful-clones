'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        current = {
          ...current,
          ...item.extraData,
        };
        break;

      case 'removeProperties':
        const keysToRemove = item.keysToRemove || [];

        keysToRemove.forEach(key => delete current[key]);
        break;

      case 'clear':
        current = {};
        break;

      default:
        break;
    }

    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;
