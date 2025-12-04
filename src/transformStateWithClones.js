'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const i of actions) {
    const nextCurrentState = { ...currentState };

    if (i.type === 'addProperties') {
      Object.assign(nextCurrentState, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete nextCurrentState[key];
      }
    }

    if (i.type === 'clear') {
      for (const key in nextCurrentState) {
        delete nextCurrentState[key];
      }
    }
    history.push(nextCurrentState);
    currentState = nextCurrentState;
  }

  return history;
}

module.exports = transformStateWithClones;
