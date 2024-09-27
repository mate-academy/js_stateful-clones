'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const allStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const eachKey of action.keysToRemove) {
          delete stateClone[eachKey];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        break;
    }

    allStates.push({ ...stateClone });
  }

  return allStates;
}

module.exports = transformStateWithClones;
