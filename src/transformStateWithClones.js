'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const allVersionsOfState = [];

  let innerState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(innerState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete innerState[key];
        };
        break;

      default:
        innerState = {};
    }

    allVersionsOfState.push({ ...innerState });
  }

  return allVersionsOfState;
}

module.exports = transformStateWithClones;
