'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = clearState();
        break;

      default:
        throw new Error('unknown operation');
    }
    states.push(currentState);
  }

  return states;
}

function addProperties(object, extraData) {
  const copy = { ...object };

  for (const key in extraData) {
    copy[key] = extraData[key];
  }

  return copy;
}

function removeProperties(object, keysToRemove) {
  const copy = { ...object };

  for (const key of keysToRemove) {
    delete copy[key];
  }

  return copy;
}

function clearState() {
  return {};
}

module.exports = transformStateWithClones;
