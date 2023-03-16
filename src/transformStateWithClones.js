'use strict';

/**
 * @param {actionect} state
 * @param {actionect[]} actions
 *
 * @return {actionect[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfStates = [];
  const copyState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete copyState[key]);
        break;

      case 'clear':
        clearState(copyState);
        break;

      default:
        return null;
    }

    arrOfStates.push({ ...copyState });
  }

  return arrOfStates;
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
