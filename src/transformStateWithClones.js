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
        currentState = add(currentState, action.extraData);
        states.push(currentState);
        break;

      case 'removeProperties':
        currentState = remove(currentState, action.keysToRemove);
        states.push(currentState);
        break;

      case 'clear':
        currentState = {};
        states.push(currentState);
        break;

      default:
        throw new Error('unknown operation');
    }
  }

  return states;
}

function add(object, extraData) {
  const copy = { ...object };

  for (const key in extraData) {
    copy[key] = extraData[key];
  }

  return copy;
}

function remove(object, keysToRemove) {
  const copy = { ...object };

  for (const key of keysToRemove) {
    delete copy[key];
  }

  return copy;
}

module.exports = transformStateWithClones;
