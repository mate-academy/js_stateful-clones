'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = { ...state }; // shallow clone is enough

  for (const action of actions) {
    let nextState = { ...current }; // clone before applying changes

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          nextState[key] = action.extraData[key];
        }
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
        // Checklist requirement: handle unexpected types
        break;
    }

    history.push({ ...nextState }); // store independent clone
    current = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
