'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let currentState = state;

  for (const action of actions) {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;
      default:
        break;
    }
    history.push(stateCopy);
    currentState = stateCopy;
  }

  return history;
}

module.exports = transformStateWithClones;
