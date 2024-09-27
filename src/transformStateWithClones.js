'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformResult = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateClone = {};

        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties':
        for (const rKey of action.keysToRemove) {
          delete stateClone[rKey];
        }
        break;
    }
    transformResult.push({ ...stateClone });
  }

  return transformResult;
}

module.exports = transformStateWithClones;
