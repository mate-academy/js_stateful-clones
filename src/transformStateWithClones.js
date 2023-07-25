'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @returns {Object[]}
 */
function transformState(state, actions) {
  const result = [];
  let cloneOfState = { ...state };

  for (const currentAction of actions) {
    let nextState = { ...cloneOfState };

    switch (currentAction.type) {
      case 'addProperties':
        const extraData = currentAction.extraData;

        for (const key in extraData) {
          nextState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        const keysToRemove = currentAction.keysToRemove;

        for (const key of keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }

    result.push(nextState);
    cloneOfState = nextState;
  }

  return result;
}

module.exports = transformState;
