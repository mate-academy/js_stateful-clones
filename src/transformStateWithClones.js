'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = addPropertiesClone(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = removePropertiesClone(newState, action.keysToRemove);
        break;

      case 'clear':
        newState = clearPropertiesClone(newState);
        break;
    }

    resultArray.push(newState);
  }

  return resultArray;
}

function addPropertiesClone(state, extraData) {
  const newState = { ...state };

  Object.assign(newState, extraData);

  return newState;
}

function removePropertiesClone(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearPropertiesClone(state) {
  return {};
}

// Example of
module.exports = transformStateWithClones;
