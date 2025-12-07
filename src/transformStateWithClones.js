'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        stateCopy = addProperties(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;
      }

      case 'clear': {
        stateCopy = clearState(stateCopy);
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    states.push({ ...stateCopy });
  }

  return states;
};

/**
 * Add properties to state object
 * @param {Object} state Current state
 * @param {Object} data Data to add
 * @returns {Object} New state object with added properties
 */
function addProperties(state, data) {
  return { ...state, ...data };
}

/**
 * Remove properties from state object
 * @param {Object} state State object
 * @param {string[]} keys Keys to remove
 * @returns {Object} New state object without specified properties
 */
function removeProperties(state, keys) {
  const newState = { ...state };

  for (const key of keys) {
    delete newState[key];
  }

  return newState;
}

/**
 * Clear state object
 * @param {Object} state State object
 * @returns {Object} Empty object
 */
function clearState(state) {
  return {};
}

module.exports = transformStateWithClones;
