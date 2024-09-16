'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultsOfEachAction = [];
  const stateCopy = { ...state };
  const commandAddProperties = 'addProperties';
  const commandRemoveProperties = 'removeProperties';
  const commandClear = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case commandAddProperties:
        Object.assign(stateCopy, extraData);
        break;

      case commandRemoveProperties:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case commandClear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default :
        throw new Error('This is not a command!');
    }

    resultsOfEachAction.push({ ...stateCopy });
  }

  return resultsOfEachAction;
}

module.exports = transformStateWithClones;
