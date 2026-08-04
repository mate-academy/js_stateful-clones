'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'clear':
        copyState = {};
        break;

      case 'removeProperties':
        const nextState = {};

        for (const key in copyState) {
          if (!action.keysToRemove.includes(key)) {
            nextState[key] = copyState[key];
          }
        }

        copyState = nextState;
        break;
    }
    result.push(copyState);
  }

  return result;
}

module.exports = transformStateWithClones;
