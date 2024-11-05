'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = Object.assign({}, stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return stateCopy;
    }
    result.push(stateCopy);
  }

  return result;
}

function removeProperties(input, keysToRemove) {
  const newInput = { ...input };

  for (const key of keysToRemove) {
    delete newInput[key];
  }

  return newInput;
}

module.exports = transformStateWithClones;
