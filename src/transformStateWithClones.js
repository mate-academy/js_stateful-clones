'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties' :
        for (const key in action.keysToRemove) {
          if (stateCopy.hasOwnProperty(action.keysToRemove[key])) {
            delete stateCopy[action.keysToRemove[key]];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'err';
    }
    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
