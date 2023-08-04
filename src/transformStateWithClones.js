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

  let stateCopy = { ...state };
  const clonedStates = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties': {
        const { extraData } = action;

        addPropertiesToState(stateCopy, extraData);
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        removeKeys(stateCopy, keysToRemove);
        break;
      }

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Smth gone wrong');
    }

    clonedStates.push({ ...stateCopy });
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

function removeKeys(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
