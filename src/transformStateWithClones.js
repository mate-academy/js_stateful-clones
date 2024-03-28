'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateToChange = { ...state };
  let currentState = { ...stateToChange };
  const iterationsOfTransform = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateToChange, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of actions[i].keysToRemove) {
          delete stateToChange[keyToRemove];
        }
        break;

      case 'clear':
        for (const keyToClear in stateToChange) {
          delete stateToChange[keyToClear];
        }
        break;

      default:
        return [{}];
    }

    currentState = { ...stateToChange };
    iterationsOfTransform.push(currentState);
  }

  return iterationsOfTransform;
}

module.exports = transformStateWithClones;
