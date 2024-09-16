'use strict';

const ACTION_ADD_PROPERTIES = 'addProperties';
const ACTION_REMOVE_PROPERTIES = 'removeProperties';
const ACTION_CLEAR_PROPERTIES = 'clear';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const results = [];
  let temporaryObject = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case ACTION_ADD_PROPERTIES:
        Object.assign(temporaryObject, extraData);

        break;
      case ACTION_REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete temporaryObject[key];
        }

        break;
      case ACTION_CLEAR_PROPERTIES:
        temporaryObject = {};

        break;
      default:
        throw new Error('Something went wrong!');
    }

    results.push({ ...temporaryObject });
  }

  return results;
}

module.exports = transformStateWithClones;
