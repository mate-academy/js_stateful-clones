'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let state2 = { ...state };
  const stateArr = [];

  for (const actionObj of actions) {
    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(state2, actionObj.extraData);
        break;

      case 'removeProperties':

        for (const key of actionObj.keysToRemove) {
          delete state2[key];
        }
        break;

      case 'clear':
        state2 = {};
    }
    stateArr.push({ ...state2 });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
