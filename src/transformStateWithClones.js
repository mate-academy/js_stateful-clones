'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const versionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        versionsOfState.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        versionsOfState.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        versionsOfState.push({ ...stateCopy });
        break;
    }
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;
