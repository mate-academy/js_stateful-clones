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

  let cloneState = { ...state };
  const clonedStates = [];

  for (const action of actions) {
    // get type of action
    const { type } = action;

    // choice correct action
    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        addPropertiesToState(cloneState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        removePropertiesToState(cloneState, keysToRemove);
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        throw new Error('Smth gone wrong');
    }

    clonedStates.push({ ...cloneState });
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
}

function removePropertiesToState(state, keysToRemove) {
  for (const removeKey of keysToRemove) {
    delete state[removeKey];
  }
}

module.exports = transformStateWithClones;
