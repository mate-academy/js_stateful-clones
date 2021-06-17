'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const versionsArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);
        versionsArray.push(Object.assign({}, stateClone));
        break;
      case 'removeProperties':
        (actions[i].keysToRemove).map(key => delete stateClone[key]);
        versionsArray.push(Object.assign({}, stateClone));
        break;
      case 'clear':
        Object.keys(stateClone).map(key => delete stateClone[key]);
        versionsArray.push(Object.assign({}, stateClone));
        break;
      default:
        break;
    }
  }

  return versionsArray;
}

module.exports = transformStateWithClones;
