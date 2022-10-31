'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = Array(actions.length);

  for (const action in actions) {
    let newState = {};

    if (result[action - 1]) {
      newState = {
        ...result[action - 1],
      };
    } else {
      newState = {
        ...state,
      };
    }

    switch (true) {
      case actions[action]['type'] === 'addProperties':
        Object.assign(newState, actions[action]['extraData']);

        result[action] = newState;
        break;

      case actions[action]['type'] === 'removeProperties':
        for (const keyToRemove in actions[action]['keysToRemove']) {
          const propToRemove = actions[action]['keysToRemove'][keyToRemove];

          if (newState.hasOwnProperty(propToRemove)) {
            delete newState[propToRemove];
          }
        }

        result[action] = newState;
        break;

      case actions[action]['type'] === 'clear':
        result[action] = {};
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
