'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties' :
        for (const key in action.keysToRemove) {
          delete stateClone[action.keysToRemove[key]];
        }

        break;

      case 'clear' :
        stateClone = {};

        break;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
