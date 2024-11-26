'use strict';

// const { meta: action } = require('eslint-plugin-node/lib/rules/no-sync');

//
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        newState = { ...newState, ...action.extraData };
        newArray.push({ ...newState });
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        newArray.push({ ...newState });
        break;
      }

      case 'clear': {
        newState = {};
        newArray.push({ ...newState });
        break;
      }
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
