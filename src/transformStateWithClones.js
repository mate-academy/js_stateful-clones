'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let stateClone = { ...state };

  for (const order of actions) {
    switch (order.type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, order.extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };
        order.keysToRemove.forEach(key => delete stateClone[key]);
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('action is not supported');
    }
    stateVersions.push(stateClone);
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
