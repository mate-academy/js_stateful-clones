'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformationsLogsList = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  let transformingObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(transformingObject, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete transformingObject[key];
        }
        break;

      case CLEAR:
        transformingObject = {};
        break;

      default:
        break;
    }
    transformationsLogsList.push({ ...transformingObject });
  }

  return transformationsLogsList;
}

module.exports = transformStateWithClones;
