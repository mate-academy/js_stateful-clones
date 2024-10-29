'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
