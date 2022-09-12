'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData)
      result.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => {
        delete newState[key];
      });

      result.push(Object.assign({}, newState));
    }

    if (action.type === 'clear') {
      newState = {};
      result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
