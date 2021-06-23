'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = Object.assign({}, state);
  const resultState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':

        for (const secondLevelKey of action.keysToRemove) {
          delete copyState[secondLevelKey];
        }
        break;
    }

    resultState.push({ ...copyState });
  }

  return resultState;
}

module.exports = transformStateWithClones;
