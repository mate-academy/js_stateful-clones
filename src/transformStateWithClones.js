'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        stateCopy = addProperties(stateCopy, action);
        transformedStates.push(stateCopy);
        break;

      case 'removeProperties' :
        stateCopy = removeProperties(stateCopy, action);
        transformedStates.push(stateCopy);
        break;

      case 'clear' :
        stateCopy = {};
        transformedStates.push(stateCopy);
        break;

      default :
        return null;
    }
  }

  return transformedStates;
}

function addProperties(state, action) {
  const newState = { ...state };

  Object.assign(newState, action.extraData);

  return newState;
}

function removeProperties(state, action) {
  const newState = { ...state };

  for (const keyToRemove of action.keysToRemove) {
    delete newState[keyToRemove];
  }

  return newState;
}

module.exports = transformStateWithClones;
