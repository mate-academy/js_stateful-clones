'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const curState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(curState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(curState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(curState);
        break;
    }
    result.push(Object.assign({}, curState));
  }

  return result;
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
