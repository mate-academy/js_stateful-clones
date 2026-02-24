'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };

  for (const action of actions) {
    let currentState = { ...prevState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }

    history.push(currentState);
    prevState = currentState;
  }

  return history;
}

module.exports = transformStateWithClones;
