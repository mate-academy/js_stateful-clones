'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const tempState = {};
  const copyState = [];

  Object.assign(tempState, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(tempState, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }

        break;
      }

      case 'clear': {
        for (const key of Object.keys(tempState)) {
          delete tempState[key];
        }

        break;
      }

      default: {
        return 'Unexpected type of action';
      }
    }

    copyState.push(Object.assign({}, tempState));
  }

  return copyState;
}

module.exports = transformStateWithClones;
