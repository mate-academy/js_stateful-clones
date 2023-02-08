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
      case 'addProperties':
        copyState = {
          ...copyState, ...action.extraData,
        };
        break;

      case 'clear':
        copyState = {};
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (copyState[key]) {
            delete copyState[key];
          }
        }
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
