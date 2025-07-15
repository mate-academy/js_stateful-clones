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
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      default:
        throw new Error('Unknown action type');
    }
    currentState = stateCopy;
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
