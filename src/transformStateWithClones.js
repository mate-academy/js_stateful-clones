'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const obj = { ...state };
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const element of actions) {
    const { type, extraData, keysToRemove } = element;

    switch (type) {
      case ADD: {
        for (const key in extraData) {
          obj[key] = extraData[key];
        }
        break;
      }

      case REMOVE: {
        for (const key of keysToRemove) {
          if (obj[key]) {
            delete obj[key];
          }
        }
        break;
      }

      case CLEAR: {
        for (const key in obj) {
          delete obj[key];
        }
        break;
      }
    }
    array.push({ ...obj });
  }

  return array;
}

module.exports = transformStateWithClones;
