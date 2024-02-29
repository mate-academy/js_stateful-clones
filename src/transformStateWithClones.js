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
        break;
      case 'removeProperties':
        keysToRemove.forEach(prop => delete currentState[prop]);
        break;
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
