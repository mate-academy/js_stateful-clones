'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateCopyHistory = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        if (
          act.extraData &&
          typeof act.extraData === 'object' &&
          !Array.isArray(act.extraData)
        ) {
          Object.assign(stateCopy, act.extraData);
        }
        break;

      case 'removeProperties':
        if (Array.isArray(act.keysToRemove)) {
          for (const key of act.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        break;
    }
    stateCopyHistory.push({ ...stateCopy });
  }

  return stateCopyHistory;
}

module.exports = transformStateWithClones;
