'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateSteps = [];
  let stateStage = { ...state };

  for (const types of actions) {
    stateStage = { ...stateStage };
    stateSteps.push(stateStage);

    switch (types.type) {
      case 'addProperties':
        addProperties(stateStage, types.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateStage, types.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateStage, types.extraData);
        break;
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
