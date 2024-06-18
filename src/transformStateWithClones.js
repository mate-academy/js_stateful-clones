'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = [];
  const cloneState = { ...state };

  for (const action of actions) {
    let newObj = {};

    switch (action.type) {
      case 'clear':
        newObj = { ...clear(cloneState) };
        break;

      case 'addProperties':
        newObj = { ...addProperties(cloneState, action.extraData) };
        break;

      case 'removeProperties':
        newObj = { ...removeProperties(cloneState, action.keysToRemove) };
        break;
    }

    transformState.push(newObj);
  }

  return transformState;
}

function addProperties(cloneState, extraData) {
  return Object.assign(cloneState, extraData);
}

function removeProperties(cloneState, keysToRemove) {
  for (const key of keysToRemove) {
    delete cloneState[key];
  }

  return cloneState;
}

function clear(cloneState) {
  for (const key in cloneState) {
    delete cloneState[key];
  }

  return cloneState;
}

module.exports = transformStateWithClones;
