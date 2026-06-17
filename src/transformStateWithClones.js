'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const log = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    const stateCopy = Object.assign({}, currentState);

    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'clear': {
        for (const key in currentState) {
          delete stateCopy[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      default: {
        break;
      }
    }
    currentState = stateCopy;
    log.push(currentState);
  }

  return log;
}

module.exports = transformStateWithClones;
