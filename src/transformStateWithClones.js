'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let statesArray = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        addProperties(newState, action.extraData);

        break;

      case 'removeProperties' :
        removeProperties(newState, action.keysToRemove);

        break;

      case 'clearProperties' :
        clearProperties(newState);

        break;
    }
  }
  return statesArray;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
