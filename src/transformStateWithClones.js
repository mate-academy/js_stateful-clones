'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateArrey = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(copyState);
        break;
    }
    stateArrey.push({ ...copyState });
  }

  return stateArrey;
}

function addProperties(copyState, extraData) {
  Object.assign(copyState, extraData);
}

function removeProperties(copyState, keysToRemove) {
  for (const key of keysToRemove) {
    delete copyState[key];
  }
}

function clearProperties(copyState) {
  for (const key in copyState) {
    delete copyState[key];
  }
}

module.exports = transformStateWithClones;
