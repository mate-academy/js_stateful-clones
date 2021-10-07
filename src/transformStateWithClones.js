'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneProperties = [];
  const cloneState = { ...state };

  for (const index of actions) {
    switch (index.type) {
      case 'addProperties':
        for (const add in index.extraData) {
          cloneState[add] = index.extraData[add];
        }
        break;

      case 'removeProperties':
        for (const remove of index.keysToRemove) {
          delete cloneState[remove];
        }
        break;

      case 'clear':
        for (const clear in cloneState) {
          delete cloneState[clear];
        }
        break;

      default:
        break;
    }
    cloneProperties.push({ ...cloneState });
  }

  return cloneProperties;
}

module.exports = transformStateWithClones;
