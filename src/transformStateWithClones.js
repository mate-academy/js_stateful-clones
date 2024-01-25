'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateSteps = [];
  let stateCopy = { ...state };

  for (const types of actions) {
    stateCopy = { ...stateCopy };
    stateSteps.push(stateCopy);

    switch (types.type) {
      case 'addProperties':
        addProperties(stateCopy, types.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, types.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy, types.extraData);
        break;

      default:
        return 'WRONG TYPE';
    }
  }

  return stateSteps;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const data of keysToRemove) {
    delete state[data];
  }
}

function clearProperties(state) {
  for (const data in state) {
    delete state[data];
  }
}

module.exports = transformStateWithClones;
