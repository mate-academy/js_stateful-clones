'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let newState = { ...state };

  for (const action of actions) {
    let modifiedState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        }
        break;

      case 'clear':
        modifiedState = {};
        break;
      default:
        throw new Error('Error');
    }
    newState = modifiedState;
    history.push(modifiedState);
  }

  return history;
}

module.exports = transformStateWithClones;
