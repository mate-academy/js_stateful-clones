'use strict';

// const { act } = require('react');
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];

  let i = 0;

  for (const action of actions) {
    newState[i] = i === 0 ? { ...state } : { ...newState[i - 1] };

    if (action.type === 'addProperties') {
      Object.assign(newState[i], action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[i][key];
      }
    }

    if (action.type === 'clear') {
      newState[i] = {};
    }

    i++;
  }

  return newState;
}

module.exports = transformStateWithClones;
