'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const clonedState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete clonedState[key];
        });
        break;
      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;
    }
    transformedState.push({ ...clonedState });
  });

  return transformedState;
}

module.exports = transformStateWithClones;
