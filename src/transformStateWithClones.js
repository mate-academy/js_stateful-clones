'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = cloneState();

  function cloneState() {
    return { ...state };
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
      case 'removeProperties':
        keysToRemove.forEach(prop => delete currentState[prop]);
        result.push({ ...currentState });
        break;
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        result.push({ ...currentState });
        break;
      default:
        result.push({ ...currentState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
