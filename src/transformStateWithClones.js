'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        const arr = action.keysToRemove;

        for (const element of arr) {
          delete clonedState[element];
        }

        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }

        break;
    }
    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
