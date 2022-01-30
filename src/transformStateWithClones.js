'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
  const stateVersions = [];

  for (let i = 0; i < actions.length; i++) {
    stateVersions.push({ ...changeProperties(modifiedState, actions[i]) });
  }

  return stateVersions;
}

function changeProperties(currentState, changes) {
  switch (changes.type) {
    case 'clear':
      for (const key in currentState) {
        delete currentState[key];
      }
      break;
    case 'addProperties':
      Object.assign(currentState, changes.extraData);
      break;
    case 'removeProperties':
      for (let j = 0; j < changes.keysToRemove.length; j++) {
        if (changes.keysToRemove[j] in currentState) {
          delete currentState[changes.keysToRemove[j]];
        }
      }
      break;
  }

  return currentState;
}

// There is another way of solving the task below
/* function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
  const stateVersions = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;

      case 'addProperties':
        Object.assign(modifiedState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          if (actions[i].keysToRemove[j] in modifiedState) {
            delete modifiedState[actions[i].keysToRemove[j]];
          }
        }
        break;
    }
    stateVersions.push({ ...modifiedState });
  }

  return stateVersions;
} */

module.exports = transformStateWithClones;
