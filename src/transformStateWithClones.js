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

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        break;
    }
    array.push({ ...newState });
  });

  return array;
}

module.exports = transformStateWithClones;
