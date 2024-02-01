'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = JSON.parse(JSON.stringify(state));
  const result = [];

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

    result.push(JSON.parse(JSON.stringify(cloneState)));
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
  for (const key in cloneState) {
    delete cloneState[key];
  }
}

module.exports = transformStateWithClones;
