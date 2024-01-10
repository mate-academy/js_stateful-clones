'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @returns {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        stateClones.push({ ...stateCopy });
        break;
      case 'removeProperties':
        const filteredEntries = Object.entries(stateCopy).filter(
          ([key]) => !action.keysToRemove.includes(key)
        );

        stateCopy = Object.fromEntries(filteredEntries);
        stateClones.push({ ...stateCopy });
        break;
      case 'clear':
        stateCopy = {};
        stateClones.push({ ...stateCopy });
        break;
      default:
        break;
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
