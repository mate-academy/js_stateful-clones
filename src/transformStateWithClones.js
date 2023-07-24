'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectCollect = [];
  const ActionTypes = {
    addProperties: 'addProperties',
    removeProperties: 'removeProperties',
    clear: 'clear',
  };

  for (const action of actions) {
    const stateCopy = {};

    if (!objectCollect.length) {
      Object.assign(stateCopy, state);
    }

    if (objectCollect.length !== 0) {
      Object.assign(stateCopy, objectCollect[objectCollect.length - 1]);
    }

    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ActionTypes.addProperties:
        Object.assign(stateCopy, extraData);

        break;

      case ActionTypes.removeProperties:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        };

        break;

      case ActionTypes.clear:
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);

        break;

      default:
        stateCopy.error = 'Action didn\'t find';
    }

    objectCollect.push(stateCopy);
  }

  return objectCollect;
}

module.exports = transformStateWithClones;
