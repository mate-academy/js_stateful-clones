'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateToChange = { ...state };

  for (const action of actions) {
    if (result.length !== 0) {
      stateToChange = { ...result[result.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateToChange, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateToChange[key];
        }

        break;
      case 'clear':
        for (const key in stateToChange) {
          delete stateToChange[key];
        }
        break;
    }

    result.push(stateToChange);
  }

  return result;
}

module.exports = transformStateWithClones;
