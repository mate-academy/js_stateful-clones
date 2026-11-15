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

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState[i], action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[i][key];
        }
        break;

      case 'clear':
        if (action.type === 'clear') {
          newState[i] = {};
        }
        break;

      default:
        break;
    }
    i++;
  }

  return newState;
}
module.exports = transformStateWithClones;
