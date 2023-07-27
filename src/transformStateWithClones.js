'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneResults = [];
  const stateCopy = {};
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  Object.assign(stateCopy, state);

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case ADD:
        const property = action.extraData;

        Object.assign(stateCopy, property);

        break;

      case REMOVE:
        const removeKeys = action.keysToRemove;

        for (const key of removeKeys) {
          delete stateCopy[key];
        }

        break;

      case CLEAR:
        for (const value in stateCopy) {
          delete stateCopy[value];
        }

        break;

      default:
        const ERROR = new Error('Wrong "state" or "actions" value!');

        return ERROR;
    }

    cloneResults.push({ ...stateCopy });
  }

  return cloneResults;
}

module.exports = transformStateWithClones;
