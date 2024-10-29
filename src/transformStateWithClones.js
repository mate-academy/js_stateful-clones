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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        for (let k = 0; k < action.keysToRemove.length; k++) {
          const key = action.keysToRemove[k];

          delete copyState[key];
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
