'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const stateActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;
    }

    stateActions.push({ ...copyState });
  }

  return stateActions;
}

function removeProperties(object, keys) {
  for (const key of keys) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;
