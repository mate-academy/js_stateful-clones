'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clones = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    const { extraData } = action;
    const { keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;
    }

    clones.push({ ...currentState });
  }

  return clones;
}

module.exports = transformStateWithClones;
