'use strict';

const ADD_ACTION = 'addProperties';
const REMOVE_ACTION = 'removeProperties';
const CLEAR_ACTION = 'clear';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let temp = { ...state };
  const states = [];

  actions.forEach(action => {
    if (action.type === ADD_ACTION) {
      temp = Object.assign({}, temp, action.extraData);
    }

    if (action.type === REMOVE_ACTION) {
      temp = Object.fromEntries(Object.entries(temp)
        .filter(entry => !action.keysToRemove.includes(entry[0])));
    }

    if (action.type === CLEAR_ACTION) {
      temp = {};
    }

    states.push(temp);
  });

  return states;
}

module.exports = transformStateWithClones;
