'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = structuredClone(state);
  const statesLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        statesLog.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        statesLog.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        statesLog.push({ ...stateCopy });
        break;

      default:
        // eslint-disable-next-line no-console
        console.error(
          'Wrong type of action! Write some of this types: ',
          'addProperties, removeProperties, clear',
        );
    }
  }

  return statesLog;
}

module.exports = transformStateWithClones;
