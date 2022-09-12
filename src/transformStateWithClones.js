'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(stateCopy, action['extraData']);
        break;

      case 'removeProperties':
        for (const delKey of action['keysToRemove']) {
          delete stateCopy[delKey];
        }
        break;

      case 'clear':
        for (const delKeys in stateCopy) {
          delete stateCopy[delKeys];
        }
        break;
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
