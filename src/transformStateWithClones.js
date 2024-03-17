'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsLength = actions.length;
  const stateClones = Array(actionsLength);
  const stateCopy = { ...state };

  for (let i = 0; i < actionsLength; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        stateClones[i] = {
          ...addProperties(stateCopy, actions[i].extraData),
        };
        break;

      case 'removeProperties':
        stateClones[i] = {
          ...removeProperties(stateCopy, actions[i].keysToRemove),
        };
        break;

      case 'clear':
        stateClones[i] = {
          ...clearProperties(stateCopy),
        };
        break;

      default:
        throw new Error('Action type is incorrect.');
    }
  }

  return stateClones;
}

function addProperties(currentState, extraData) {
  return Object.assign(currentState, { ...extraData });
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }

  return currentState;
}

function clearProperties(currentState) {
  for (const key in currentState) {
    delete currentState[key];
  }

  return currentState;
}

module.exports = transformStateWithClones;
