'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithstateClones(state, actions) {
  const stateClone = { ...state };
  const resultArr = [];

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        Object.assign(stateClone, el.extraData);
        break;
      case 'removeProperties':
        for (const element of el.keysToRemove) {
          delete stateClone[element];
        };
        break;
      case 'clear':
        Object.keys(stateClone).forEach(element => {
          delete stateClone[element];
        });
        break;
      default:
        return 'Error';
    }

    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithstateClones;
