'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [state];

  for (const action of actions) {
    let newState = { ...result[result.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const removeItem in keysToRemove) {
          delete newState[keysToRemove[removeItem]];
        }
        break;
      case 'clear':
        newState = {};
        break;
    }

    result.push(newState);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
