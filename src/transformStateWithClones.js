'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateAfterAction = [];

  const copyState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        Object.assign(copyState, action.extraData);

        break;

      case 'removeProperties':
        for (const deleteKey of action.keysToRemove) {
          delete copyState[deleteKey];
        }

        break;

      case 'clear':
        for (const stateKey in copyState) {
          delete copyState[stateKey];
        }

        break;

      default:
        continue;
    }

    stateAfterAction.push({ ...copyState });
  }

  return stateAfterAction;
}

module.exports = transformStateWithClones;
