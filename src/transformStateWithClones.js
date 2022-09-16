'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const emptyArr = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateClone, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateClone[key];
        };
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw Error('no action');
    }
    emptyArr.push({ ...stateClone });
  }

  return emptyArr;
}

module.exports = transformStateWithClones;
