'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete newState[keyToRemove];
        }
        break;
    }

    result.push(Object.assign({}, newState));
  }

  return result;
}

module.exports = transformStateWithClones;
