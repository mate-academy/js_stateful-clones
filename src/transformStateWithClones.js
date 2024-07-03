'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const allStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        allStates.push({ ...stateCopy });
        break;

      case 'removeProperties':
        removeProps(stateCopy, action.keysToRemove);
        allStates.push({ ...stateCopy });
        break;

      case 'clear':
        clear(stateCopy);
        allStates.push({ ...stateCopy });
        break;
    }
  }

  return allStates;
}

function addProperties(object, extraData) {
  Object.assign(object, extraData);
}

function removeProps(object, keysToRemove) {
  for (const key of keysToRemove) {
    delete object[key];
  }
}

function clear(object) {
  for (const key in object) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;
