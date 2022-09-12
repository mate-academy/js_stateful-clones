'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const initialState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(initialState, action['extraData']);
        break;

      case 'removeProperties':
        for (const delClause of action['keysToRemove']) {
          delete initialState[delClause];
        }
        break;

      case 'clear':
        for (const delAllTheClauses in initialState) {
          delete initialState[delAllTheClauses];
        }
        break;
    }

    result.push({ ...initialState });
  }

  return result;
}

module.exports = transformStateWithClones;
