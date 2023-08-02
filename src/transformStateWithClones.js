'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const TYPE_ADD_PROPERTIES = 'addProperties';
const TYPE_REMOVE_PROPERTIES = 'removeProperties';
const TYPE_CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const statesList = [{ ...state }];

  for (const action of actions) {
    let currentObject = { ...statesList.slice(-1)[0] };

    switch (action.type) {
      case TYPE_ADD_PROPERTIES: {
        const objectWithNewFields = action.extraData;

        currentObject = {
          ...currentObject,
          ...objectWithNewFields,
        };
        break;
      }

      case TYPE_REMOVE_PROPERTIES: {
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete currentObject[key];
        }

        currentObject = { ...currentObject };
        break;
      }

      case TYPE_CLEAR: {
        currentObject = {};
        break;
      }

      default: return 'undefined type';
    }

    statesList.push(currentObject);
  }

  return statesList.slice(1);
}

module.exports = transformStateWithClones;
