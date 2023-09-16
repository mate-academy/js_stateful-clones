'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const action of actions) {
    const keysToAdd = action.extraData;

    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateClone, keysToAdd);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      }

      case 'clear': {
        stateClone = {};
        break;
      }
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
