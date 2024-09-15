'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const changesArray = [];

  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    // can deconstruct directly in cycle
    switch (type) {
      case ADD_PROPERTIES:
        stateCopy = Object.assign(stateCopy, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        };
        break;

      case CLEAR:
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
      default:
        throw new Error('invalid action type');
    }

    changesArray.push({ ...stateCopy });
  }

  return changesArray;
}

module.exports = transformStateWithClones;
