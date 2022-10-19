'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copyState = { ...state };

  for (const actionObj of actions) {
    switch (actionObj.type) {
      case 'addProperties' :
        Object.assign(copyState, actionObj.extraData);
        break;

      case 'removeProperties':
        for (const key of actionObj.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear' :
        for (const element in copyState) {
          delete copyState[element];
        }
        break;
    }

    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
