'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case `removeProperties`:
        for (const type of action.keysToRemove) {
          delete newState[type];
        }
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
