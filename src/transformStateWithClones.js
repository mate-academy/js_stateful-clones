'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = [];

  for (const action of actions) {
    const lastState = {
      ...copyState.length === 0
        ? state
        : copyState[copyState.length - 1],
    };

    switch (action.type) {
      case 'addProperties':
        Object.assign(lastState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete lastState[key]);
        break;
      case 'clear':
        Object.getOwnPropertyNames(lastState)
          .forEach(key => delete lastState[key]);
        break;
      default:
        break;
    }

    copyState.push(lastState);
  }

  return copyState;
}

module.exports = transformStateWithClones;
