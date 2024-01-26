'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];

  for (const action of actions) {
    const currentState = clones[clones.length - 1] || state;
    const clone = {};

    if (action.type === 'addProperties') {
      Object.assign(clone, currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key in currentState) {
        if (!action.keysToRemove.includes(key)) {
          clone[key] = currentState[key];
        }
      }
    }
    clones.push(clone);
  }

  return clones;
}

module.exports = transformStateWithClones;
