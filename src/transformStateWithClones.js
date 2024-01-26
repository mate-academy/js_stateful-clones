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

    switch (action.type) {
      case 'addProperties': {
        Object.assign(clone, currentState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            clone[key] = currentState[key];
          }
        }
        break;
      }
    }

    clones.push(clone);
  }

  return clones;
}

module.exports = transformStateWithClones;
