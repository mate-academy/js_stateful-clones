'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = Object.assign({}, state);
  const eachAction = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        eachAction.push(addProperties(stateClone, action.extraData));
        break;

      case 'removeProperties':
        eachAction.push(removeProperties(stateClone, action.keysToRemove));
        break;

      case 'clear':
        eachAction.push(clear(stateClone));
        break;
    }
  }

  return eachAction;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);

  return { ...state };
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return { ...state };
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }

  return { ...state };
}

module.exports = transformStateWithClones;
