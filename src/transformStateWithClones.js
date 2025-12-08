'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = { ...state };
  let currentState = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...stateCopy };

        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = { ...stateCopy };

        if (Array.isArray(action.keysToRemove)) {
          for (const keyToRemove of action.keysToRemove) {
            delete currentState[keyToRemove];
          }
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('ERROR');
    }

    history.push(currentState);
    stateCopy = { ...currentState };
  }

  return history;
}

module.exports = transformStateWithClones;
