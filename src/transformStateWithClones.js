'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const modifyState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = addProperties(modifyState, action.extraData);
        break;

      case 'removeProperties':
        nextState = removeProperties(modifyState, action.keysToRemove);
        break;

      case 'clear':
        nextState = clear(modifyState);
        break;

      default:
        break;
    }
    result.push(nextState);
  }

  return result;
}

function addProperties(state, properties) {
  Object.assign(state, properties);

  return { ...state };
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return { ...state };
}

function clear(state) {
  for (const key of Object.keys(state)) {
    delete state[key];
  }

  return {};
}

module.exports = transformStateWithClones;
