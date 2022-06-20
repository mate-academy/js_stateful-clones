'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        result.push({ ...copyOfState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (!copyOfState[key]) {
            continue;
          }

          delete copyOfState[key];
        }

        result.push({ ...copyOfState });
        break;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }

        result.push({ ...copyOfState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
