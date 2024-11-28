'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateClone, { ...action.extraData });
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      }
    }

    result.push(stateClone);
    stateClone = { ...stateClone };
  }

  return result;
}

module.exports = transformStateWithClones;
