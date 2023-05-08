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
  let lastCopy = 0;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete newState[key];
        });
        break;
      case 'clear':
        Object.keys(newState).forEach(key =>
          delete newState[key]);
    }

    result.push(Object.assign({}, newState));
    newState = Object.assign({}, result[lastCopy]);
    lastCopy++;
  }

  return result;
}

module.exports = transformStateWithClones;
