'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const statesArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        const propsToAdd = Object.entries(extraData);

        for (const [key, value] of propsToAdd) {
          stateClone[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        const stateKeys = Object.keys(stateClone);

        for (const key of stateKeys) {
          delete stateClone[key];
        }
        break;

      default:
        return -1;
    }
    statesArr.push({ ...stateClone });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
