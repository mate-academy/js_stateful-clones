'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  let newState = { ...state };

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties' :
        newState = addProperties(newState, actions[action]);
        transformedStates.push(newState);
        break;

      case 'removeProperties' :
        newState = removeProperties(newState, actions[action]);
        transformedStates.push(newState);
        break;

      case 'clear' :
        newState = {};
        transformedStates.push(newState);
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
