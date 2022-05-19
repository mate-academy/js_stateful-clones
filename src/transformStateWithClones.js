'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prevState = { ...state };
  const states = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(prevState, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete prevState[key];
      }
    }

    if (type === 'clear') {
      for (const key in prevState) {
        delete prevState[key];
      }
    }

    states.push({ ...prevState });
  }

  return states;
}

module.exports = transformStateWithClones;
