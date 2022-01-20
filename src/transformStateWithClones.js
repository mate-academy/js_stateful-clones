'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const statesVers = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }
    statesVers.push({ ...stateCopy });
  }

  return statesVers;
}

module.exports = transformStateWithClones;
