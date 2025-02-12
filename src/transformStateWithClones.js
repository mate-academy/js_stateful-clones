'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateDuplicate = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateDuplicate, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (Object.hasOwn(stateDuplicate, key)) {
            delete stateDuplicate[key];
          }
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateDuplicate)) {
          delete stateDuplicate[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...stateDuplicate });
  }

  return result;
}

module.exports = transformStateWithClones;
