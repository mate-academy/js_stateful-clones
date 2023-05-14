'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const transformedStates = [];
  let clonedState = { ...initialState };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProperties(clonedState, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(clonedState, action.keysToRemove);
        break;
      }

      case 'clear': {
        clonedState = clearObject(clonedState);
        break;
      }

      default: {
        throw Error(`Unknown action: ${action.type}`);
      }
    }

    transformedStates.push({ ...clonedState });
  }

  return transformedStates;
}

function addProperties(obj, data) {
  Object.assign(obj, data);
}

function removeProperties(obj, keys) {
  for (const key of keys) {
    delete obj[key];
  }
}

function clearObject(obj) {
  return {};
}

module.exports = transformStateWithClones;
