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
    switch (action.type) {
      case 'addProperties':
        const propsToAdd = Object.entries(action.extraData);

        for (const [key, value] of propsToAdd) {
          stateClone[key] = value;
        }
        statesArr.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        statesArr.push({ ...stateClone });
        break;

      case 'clear':
        const stateKeys = Object.keys(stateClone);

        for (const key of stateKeys) {
          delete stateClone[key];
        }
        statesArr.push({ ...stateClone });
        break;

      default:
        return -1;
    }
  }

  return statesArr;
}

module.exports = transformStateWithClones;
