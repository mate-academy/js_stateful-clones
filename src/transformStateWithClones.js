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
        history.push(currentState);
        stateCopy = { ...currentState };
        break;

      case 'removeProperties':
        currentState = { ...stateCopy };

        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }
        history.push(currentState);
        stateCopy = { ...currentState };
        break;

      case 'clear':
        stateCopy = {};
        history.push(stateCopy);
        break;

      default:
        throw new Error('ERROR');
    }
  }

  return history;
}

module.exports = transformStateWithClones;
