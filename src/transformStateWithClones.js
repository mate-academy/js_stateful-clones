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
    let nextState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:


      }

    history.push(nextState);
    prevState = nextState;
  }

  return history;
}
module.exports = transformStateWithClones;
