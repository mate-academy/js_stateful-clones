'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];

  for (const action of actions) {
    const currentState = {};

    if (stateClones.length !== 0) {
      Object.assign(currentState, stateClones[stateClones.length - 1]);
    }

    if (stateClones.length === 0) {
      Object.assign(currentState, state);
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
    }
    stateClones.push(currentState);
  }

  return stateClones;
}

module.exports = transformStateWithClones;
