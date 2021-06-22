'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = cloneObject(state);
  const stateClones = new Array(actions.length);
  let index = 0;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const property in action.extraData) {
          stateCopy[property] = action.extraData[property];
        }
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateCopy[property];
        }
        break;
      case 'clear':
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;
    }
    stateClones[index] = cloneObject(stateCopy);
    index++;
  }

  return stateClones;
}

function cloneObject(original) {
  const clone = {};

  for (const property in original) {
    clone[property] = original[property];
  }

  return clone;
}

module.exports = transformStateWithClones;
