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
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...prevState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...prevState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = { ...prevState };
    }

    history.push(newState);
    prevState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
