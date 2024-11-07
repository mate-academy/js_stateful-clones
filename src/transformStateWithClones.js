'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;
    }

    states.push({ ...stateCopy });
  }

  return states;
}

function removeProperties(state, keysToRemove) {
  const updatedState = { ...state };

  for (const key of keysToRemove) {
    delete updatedState[key];
  }

  return updatedState;
}

module.exports = transformStateWithClones;
