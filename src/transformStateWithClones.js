'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = structuredClone(state);
  const states = [];

  for (const action of actions) {
    const { type, extraData = {}, keysToRemove = [] } = action;

    if (type === 'addProperties') {
      for (const [key, value] of Object.entries(extraData)) {
        stateClone[key] = value;
      }
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete stateClone[key];
      }
    } else if (type === 'clear') {
      for (const key of Object.keys(stateClone)) {
        delete stateClone[key];
      }
    }

    states.push(structuredClone(stateClone));
  }

  return states;
}

module.exports = transformStateWithClones;
