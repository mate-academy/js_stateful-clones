'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let stClone = { ...state };

  for (const order of actions) {
    switch (order.type) {
      case 'addProperties':
        stClone = { ...stClone };
        Object.assign(stClone, order.extraData);
        break;

      case 'removeProperties':
        stClone = { ...stClone };
        order.keysToRemove.forEach(key => delete stClone[key]);
        break;

      case 'clear':
        stClone = {};
        break;

      default:
        break;
    }
    stateVersions.push(stClone);
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
