'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const keyActions of actions) {
    switch (keyActions.type) {
      case 'addProperties':
        Object.assign(stateCopy, keyActions.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keyActions.keysToRemove) {
          delete stateCopy[keyToRemove];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
    }

    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

module.exports = transformStateWithClones;
