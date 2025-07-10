'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  //
  // variable name "object" is used due to using variable name
  // "state" in this function (as a parameter)
  //
  const addProperties = (object, { extraData }) => {
    return Object.assign({}, object, extraData);
  };

  const removeProperties = (object, { keysToRemove }) => {
    const stateCopy = { ...object };

    for (const ch of keysToRemove) {
      delete stateCopy[ch];
    }

    return stateCopy;
  };

  const clear = () => {
    return {};
  };

  const stateArray = [];
  let previousState = state;
  let newState = {};

  for (const { type, ...rest } of actions) {
    switch (type) {
      case 'addProperties':
        newState = addProperties(previousState, rest);
        break;
      case 'removeProperties':
        newState = removeProperties(previousState, rest);
        break;
      case 'clear':
        newState = clear();
        break;
      default:
        throw new Error('Non-existant action');
    }

    stateArray.push(newState);
    previousState = newState;
  }

  return stateArray;
}

module.exports = transformStateWithClones;
