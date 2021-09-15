'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateVersions = [];

  actions.map(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        stateVersions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        stateVersions.push({ ...stateCopy });
        break;

      case 'clear':
        Object.keys(stateCopy).map(key => {
          delete stateCopy[key];
        });
        stateVersions.push({ ...stateCopy });
        break;

      default:
        throw new Error('Invalid action type.');
    }
  });

  return stateVersions;
}

module.exports = transformStateWithClones;
