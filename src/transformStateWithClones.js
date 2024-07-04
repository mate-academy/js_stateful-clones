'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let previousState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(previousState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete previousState[remove];
        }
        break;

      case 'clear':
        previousState = {};
        break;

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
    history.push({ ...previousState });
  }

  return history;
}

module.exports = transformStateWithClones;
