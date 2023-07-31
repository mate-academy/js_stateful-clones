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

    // choice correct action
    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        // get object with adding new properties
        const addedProperties = addPropertiesToState(cloneState, extraData);

        // add generated object to cloned array
        clonedStates.push(addedProperties);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        // get object with removing properties with special keys
        const removedProperties
          = removePropertiesToState(cloneState, keysToRemove);

        // add generated object to cloned array
        clonedStates.push(removedProperties);
        break;

      case 'clear':
        // get object with cleared properties
        const clearedProperties = clearPropertiesToState(cloneState);

        // add generated object to cloned array
        clonedStates.push(clearedProperties);
        break;
    }
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
