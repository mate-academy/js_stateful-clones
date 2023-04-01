'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const modState = [];

  for (const actionObj of actions) {
    switch (actionObj.type) {
      case 'addProperties' :
        Object.assign(newState, actionObj.extraData);
        break;

      case 'removeProperties' :
        for (const key of actionObj.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const element in newState) {
          delete newState[element];
        }
    }

    modState.push({ ...newState });
  }

  return modState;
}

module.exports = transformStateWithClones;
