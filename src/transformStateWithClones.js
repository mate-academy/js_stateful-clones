'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // check arguments type
  if (!isObject(state) && !isObject(actions)) {
    throw new Error('Invalid arguments');
  }

  const cloneState = { ...state };
  const clonedStates = [];

  for (const action of actions) {
    // get type of action
    const { type } = action;
    let changedObject = null;

    // choice correct action
    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        changedObject = addPropertiesToState(cloneState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        changedObject = removePropertiesToState(cloneState, keysToRemove);
        break;

      case 'clear':
        changedObject = clearPropertiesToState(cloneState);
        break;

      default:
        throw new Error('Smth gone wrong');
    }

    clonedStates.push(changedObject);
  }

  return clonedStates;
}

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function addPropertiesToState(state, extraData) {
  for (const key in extraData) {
    state[key] = extraData[key];
  }

  return { ...state };
}

function removePropertiesToState(state, keysToRemove) {
  for (const removeKey of keysToRemove) {
    delete state[removeKey];
  }

  return { ...state };
}

function clearPropertiesToState(state) {
  for (const key in state) {
    delete state[key];
  }

  return { ...state };
}

module.exports = transformStateWithClones;
