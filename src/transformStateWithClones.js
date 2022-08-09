'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const currentState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        for (const value of keysToRemove) {
          delete currentState[value];
        }
        break;
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default: {
        throw new Error(`Unknown action type: ${type}`);
      }
    }

    history.push(Object.assign({}, currentState));
  }

  return history;
}

module.exports = transformStateWithClones;
