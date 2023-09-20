'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const log = [];
  const clear = 'clear';
  const addProperties = 'addProperties';
  const removeProperties = 'removeProperties';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case clear:
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      case addProperties:
        Object.assign(stateCopy, extraData);
        break;
      case removeProperties:
        keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      default:
        throw new Error('wrong actions type');
    }

    log.push({ ...stateCopy });
  }

  return log;
}

module.exports = transformStateWithClones;
