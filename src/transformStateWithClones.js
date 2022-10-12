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
      case 'clear':
        stateClone = {};
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
