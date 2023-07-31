'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const TYPE_ADD_PROPERTIES = 'addProperties';
  const TYPE_REMOVE_PROPERTIES = 'removeProperties';
  const TYPE_CLEAR = 'clear';
  const statesList = [{ ...state }];

  for (const action of actions) {
    const currentObject = { ...statesList.slice(-1)[0] };

    switch (action.type) {
      case TYPE_ADD_PROPERTIES: {
        const objectWithNewFields = action.extraData;

        statesList.push(
          {
            ...currentObject,
            ...objectWithNewFields,
          });
        break;
      }

      case TYPE_REMOVE_PROPERTIES: {
        const arrayOfFields = action.keysToRemove;

        for (const field of arrayOfFields) {
          delete currentObject[field];
        }

        statesList.push({ ...currentObject });
        break;
      }

      case TYPE_CLEAR: {
        statesList.push({});
        break;
      }

      default: return 'undefined type';
    }
  }

  return statesList.slice(1);
}

module.exports = transformStateWithClones;
