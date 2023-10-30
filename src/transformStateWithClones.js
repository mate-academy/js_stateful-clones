'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneOfState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneOfState, action.extraData);

      const cloneOfClone = { ...cloneOfState };

      result.push(cloneOfClone);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneOfState[key];
      }

      const cloneOfClone = { ...cloneOfState };

      result.push(cloneOfClone);
    }

    if (action.type === 'clear') {
      for (const key in cloneOfState) {
        delete cloneOfState[key];
      }

      const cloneOfClone = { ...cloneOfState };

      result.push(cloneOfClone);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
