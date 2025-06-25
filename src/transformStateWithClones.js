'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state }; // initial clone

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // clone first

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    // ✅ Push a new shallow copy to ensure immutability
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
