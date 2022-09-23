'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  const cloneState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete cloneState[keys];
        }
        break;

      default:
        for (const keys in cloneState) {
          delete cloneState[keys];
        }
        break;
    }

    newState.push({ ...cloneState });
  });

  return newState;
}

module.exports = transformStateWithClones;
