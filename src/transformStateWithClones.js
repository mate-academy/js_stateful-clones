'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 *
 * transformStateWithClones()
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        result.push(addProperties(stateCopy, action.extraData));
        break;

      case 'removeProperties':
        result.push(removeProperties(stateCopy, action.keysToRemove));
        break;

      case 'clear':
        result.push(clear(stateCopy));
        break;
    }
  }

  return result;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);

  let stateA = {}; /* №1 */

  stateA = { ...stateCopy };

  return stateA;
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }

  const stateB = { ...stateCopy };

  return stateB;
}

function clear(stateCopy) {
  for (const cler in stateCopy) {
    delete stateCopy[cler];
  }

  const stateCopyB = {};

  return stateCopyB;
}

module.exports = transformStateWithClones;
