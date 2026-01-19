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

  for (const act of actions) {
    let nextState = { ...currentState };

    if (act.type === 'addProperties') {
      Object.assign(nextState, act.extraData);
    }

    if (act.type === 'removeProperties') {
      for (const key of act.keysToRemove) {
        if (Object.prototype.hasOwnProperty.call(nextState, key)) {
          delete nextState[key];
        }
      }
    }

    if (act.type === 'clear') {
      nextState = {};
    }
    history.push(nextState);
    currentState = { ...nextState };
  }

  return history;
}

module.exports = transformStateWithClones;
