'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateArray = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete stateClone[keys];
        }
    }
    stateArray.push({ ...stateClone });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
