'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        result.push(Object.assign({}, newState));
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        result.push(Object.assign({}, newState));
        break;

      case 'clear':
        newState = {};
        result.push(Object.assign({}, newState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
