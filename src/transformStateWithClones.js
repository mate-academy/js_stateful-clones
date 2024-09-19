'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistory = [];

  for (let index = 0; index < actions.length; index++) {
    const action = actions[index];
    const type = action.type;
    const keys = Object.keys(stateCopy);

    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateCopy[action.keysToRemove[i]];
        }
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        for (let i = 0; i < keys.length; i++) {
          delete stateCopy[keys[i]];
        }
        stateHistory.push({});
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
