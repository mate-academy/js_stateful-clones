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

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties' :
        stateCopy = addProperties(stateCopy, actions[action]);
        transformedStates.push(stateCopy);
        break;

      case 'removeProperties' :
        stateCopy = removeProperties(stateCopy, actions[action]);
        transformedStates.push(stateCopy);
        break;

      case 'clear' :
        stateCopy = {};
        transformedStates.push(stateCopy);
        break;

      default :
        return 'error';
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

  for (const keyToRemove in action.keysToRemove) {
    delete newState[action.keysToRemove[keyToRemove]];
  }

  return newState;
}

module.exports = transformStateWithClones;
