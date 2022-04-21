'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const clones = [];

  for (const property of actions) {
    if (property.type === 'addProperties') {
      Object.assign(newState, property.extraData);
    }

    if (property.type === 'removeProperties') {
      property.keysToRemove
        .forEach(key => delete newState[key]);
    }

    if (property.type === 'clear') {
      Object.keys(newState)
        .forEach(key => delete newState[key]);
    }
    clones.push({ ...newState });
  }

  return clones;
}

module.exports = transformStateWithClones;
