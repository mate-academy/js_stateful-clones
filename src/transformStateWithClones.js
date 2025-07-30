'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const act of actions) {
    const nextState = { ...currentState };

    if (act.type === 'clear') {
      currentState = {};
    }

    if (act.type === 'addProperties') {
      currentState = Object.assign(nextState, act.extraData);
    }

    if (act.type === 'removeProperties') {
      act.keysToRemove.forEach((el) => delete nextState[el]);
      currentState = nextState;
    }
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
