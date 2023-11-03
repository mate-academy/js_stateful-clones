'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const newState = [];

  for (const property of actions) {
    if (property.type === 'addProperties') {
      Object.assign(cloneState, property.extraData);
    }

    if (property.type === 'removeProperties') {
      for (const key of property.keysToRemove) {
        delete cloneState[key];
      }
    }

    if (property.type === 'clear') {
      cloneState = {};
    }

    newState.push({ ...cloneState });
  }

  return newState;
}

module.exports = transformStateWithClones;
