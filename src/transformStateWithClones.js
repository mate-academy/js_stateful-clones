'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultingArray = [];
  let newState = {
    ...state,
  };

  for (const action of actions) {
    const clonedState = cloneState(newState, action);

    resultingArray.push(clonedState);

    newState = clonedState;
  }

  return resultingArray;
}

function cloneState(state, action) {
  const type = action.type;
  const actingProperties = action.extraData || action.keysToRemove;

  switch (type) {
    case 'addProperties':
      return {
        ...state,
        ...actingProperties,
      };
    case 'removeProperties':
      return clonePartial(state, actingProperties);
    case 'clear':
    default:
      return {};
  }

  function clonePartial(objectToClone, propertiesToRemove) {
    const clonedObject = {};

    for (const property in objectToClone) {
      if (!propertiesToRemove.includes(property)) {
        clonedObject[property] = objectToClone[property];
      }
    }

    return clonedObject;
  }
}

module.exports = transformStateWithClones;
