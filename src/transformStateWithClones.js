'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massive = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        massive.push({ ...newState });
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        massive.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        break;
    }

    massive.push({ ...newState });
  }

  return massive;
}

module.exports = transformStateWithClones;
