/* eslint-disable no-console */
/* eslint-disable no-lone-blocks */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const CLEAR = 'clear';
  const REMOVE_PROPERTIES = 'removeProperties';

  const result = [];
  const stateClone = { ...state };

  for (const actionObject of actions) {
    switch (actionObject.type) {
      case ADD_PROPERTIES:
        {
          const entries = Object.entries(actionObject.extraData);

          for (const entrie of entries) {
            Object.defineProperty(stateClone, entrie[0], {
              value: entrie[1],
              writable: true,
              enumerable: true,
              configurable: true,
            });
          }
          result.push({ ...stateClone });
        }
        break;

      case CLEAR:
        {
          const keysOfStateClone = Object.keys(stateClone);

          for (const key of keysOfStateClone) {
            if (Object.hasOwn(stateClone, key)) {
              delete stateClone[key];
            }
          }
          result.push({ ...stateClone });
        }
        break;

      case REMOVE_PROPERTIES:
        {
          for (const keyToRemove of actionObject.keysToRemove) {
            if (Object.hasOwn(stateClone, keyToRemove)) {
              delete stateClone[keyToRemove];
            }
          }
          result.push({ ...stateClone });
        }
        break;

      default:
        result.push({ ...stateClone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
