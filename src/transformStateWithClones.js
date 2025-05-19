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
  let currentState = { ...state };

  for (const obj of actions) {
    const { type } = obj;

    switch (type) {
      case 'addProperties':
        const { extraData } = obj;

        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        const { keysToRemove } = obj;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unknown action type');
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
