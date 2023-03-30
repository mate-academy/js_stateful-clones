'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clonedState = Object.assign({}, state);

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(clonedState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(keyToRemove => {
        delete clonedState[keyToRemove];
      });
    } else if (action.type === 'clear') {
      for (const key in clonedState) {
        delete clonedState[key];
      }
    }

    result.push(Object.assign({}, clonedState));
  });

  return result;
}

module.exports = transformStateWithClones;
