'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const i of action.keysToRemove) {
          delete newState[i];
        };
        break;

      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
    }
    array.push({ ...newState });
  }

  return array;
}

module.exports = transformStateWithClones;
