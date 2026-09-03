'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const property of actions) {
    let stateClone = { ...currentState };

    if (property.type === 'addProperties') {
      stateClone = { ...stateClone, ...property.extraData };
    }

    if (property.type === 'removeProperties') {
      for (const key of property.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (property.type === 'clear') {
      stateClone = {};
    }
    result.push(stateClone);
    currentState = stateClone;
  }

  return result;
}

module.exports = transformStateWithClones;
