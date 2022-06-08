'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of keysToRemove) {
          if (stateClone.hasOwnProperty(keyRemove)) {
            delete stateClone[keyRemove];
          }
        }
        break;

      case 'clear':
        Object.getOwnPropertyNames(stateClone).forEach(key =>
          (delete stateClone[key])
        );
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
