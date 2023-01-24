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
        result.push(Object.assign({}, clonedState));
        break;

      case 'removeProperties':
        const arr = action.keysToRemove;

        for (const element of arr) {
          delete clonedState[element];
        }

        result.push(Object.assign({}, clonedState));
        break;

      case 'clear':
        for (const key in clonedState) {
          if (clonedState.hasOwnProperty(key)) {
            delete clonedState[key];
          }
        }

        result.push(Object.assign({}, clonedState));
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
