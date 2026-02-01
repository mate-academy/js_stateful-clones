'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prewState = { ...state };
  const result = [];

  for (const action of actions) {
    let newState = { ...prewState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        const value = action.extraData[key];

        newState[key] = value;
      }
      prewState = newState;
      result.push(newState);
    }

    if (action.type === 'removeProperties') {
      for (const keyDelete of action.keysToRemove) {
        delete newState[keyDelete];
      }

      prewState = newState;
      result.push(newState);
    }

    if (action.type === 'clear') {
      newState = {};

      prewState = newState;
      result.push(newState);
    }
  }
}

module.exports = transformStateWithClones;
