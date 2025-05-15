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
  const cloneState = structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(cloneState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(cloneState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(cloneState);
        break;
    }

    result.push(structuredClone(cloneState));
  }

  return result;
}

function addProperties(cloneState, extraData) {
  Object.assign(cloneState, extraData);
}

function removeProperties(cloneState, keysToRemove) {
  for (const key of keysToRemove) {
    delete cloneState[key];
  }
}

function clearProperties(cloneState) {
  for (const keys in cloneState) {
    delete cloneState[keys];
  }
}

module.exports = transformStateWithClones;
