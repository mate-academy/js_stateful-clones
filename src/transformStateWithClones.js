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
        addProperties(stateCopy, action);
        break;

      case 'removeProperties' :
        removeProperties(stateCopy, action);
        break;

      case 'clear' :
        stateCopy = {};
        break;

      default :
        throw new Error('Wrong action type');
    }

    transformedStates.push({ ...stateCopy });
  }

  return transformedStates;
}

function addProperties(state, action) {
  Object.assign(state, action.extraData);
}

function removeProperties(state, action) {
  for (const keyToRemove of action.keysToRemove) {
    delete state[keyToRemove];
  }
}

module.exports = transformStateWithClones;
