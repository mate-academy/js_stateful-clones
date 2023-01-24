'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = Object.assign({}, state);
  const clonesArray = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        stateClone = {
          ...stateClone,
          ...element.extraData,
        };
        clonesArray.push(stateClone);
        break;

      case 'removeProperties':
        for (const key of element.keysToRemove) {
          delete stateClone[key];
        }

        clonesArray.push(stateClone);
        break;

      default:
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        clonesArray.push({});
        break;
    }
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
