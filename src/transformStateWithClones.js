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
    switch (action.type) {
      case 'addProperties':
        stateClone
        = {
            ...stateClone, ...action.extraData,
          };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          stateClone = { ...stateClone };
          delete stateClone[key];
        }

        break;

      case 'clear':
        stateClone = {};
        break;
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
