'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let newProperties, propertiesToRemove;

    switch (type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        newProperties = extraData;
        Object.assign(currentState, newProperties);
        break;

      case 'removeProperties':
        propertiesToRemove = keysToRemove;

        for (const keyToRemove of propertiesToRemove) {
          if (currentState.hasOwnProperty(keyToRemove)) {
            delete currentState[keyToRemove];
          }
        }
        break;

      default:
        continue;
    }

    states.push(Object.assign({}, currentState));
  }

  return states;
}

module.exports = transformStateWithClones;
