'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (
          typeof action.extraData === 'object' &&
          action.extraData !== null &&
          !Array.isArray(action.extraData)
        ) {
          Object.assign(nextState, action.extraData);
        } else {
          throw new Error('Invalid extraData for addProperties');
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        } else {
          throw new Error('Invalid keysToRemove for removeProperties');
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
