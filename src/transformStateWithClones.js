'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let duplicateState = { ...state };
  const changesToState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        duplicateState = { ...duplicateState, ...action.extraData };
        break;

      case 'clear':
        duplicateState = {};
        break;

      case 'removeProperties':
        duplicateState = { ...duplicateState };

        for (const key of action.keysToRemove) {
          delete duplicateState[key];
        }
        break;
    }
    changesToState.push({ ...duplicateState });
  }

  return changesToState;
}

module.exports = transformStateWithClones;
