'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 * @returns {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const nextState = { ...state };

  for (const currentAction of actions) {
    switch (currentAction.type) {
      case 'addProperties':
        const { extraData } = currentAction;

        Object.assign(nextState, extraData);
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
        for (const key in nextState) {
          delete nextState[key];
        }
        break;

      default:

        throw Error('Something went wrong');
    }

    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
