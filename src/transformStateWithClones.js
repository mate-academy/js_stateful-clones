'use strict';

const Action = Object.freeze({
  ADD: 'addProperties',
  REMOVE: 'removeProperties',
  CLEAR: 'clear',
});

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const { ADD, REMOVE, CLEAR } = Action;
  let temp = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === ADD) {
      temp = Object.assign({}, temp, action.extraData);
    }

    if (action.type === REMOVE) {
      temp = { ...temp };

      for (const key of action.keysToRemove) {
        delete temp[key];
      }
    }

    if (action.type === CLEAR) {
      temp = {};
    }

    states.push(temp);
  }

  return states;
}

module.exports = transformStateWithClones;
