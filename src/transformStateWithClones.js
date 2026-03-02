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
    let stateCopy;

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        stateCopy = { ...currentState };
        break;
    }

    currentState = stateCopy;
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
