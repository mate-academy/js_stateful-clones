'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES_TYPE = 'addProperties';
  const REMOVE_PROPERTIES_TYPE = 'removeProperties';
  const CLEAR_TYPE = 'clear';
  const PROPERTIES_TO_ADD_KEY = 'extraData';
  const PROPERTIES_TO_REMOVE_KEY = 'keysToRemove';

  const clonesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES_TYPE:
        if (clonesArray.length === 0) {
          clonesArray.push(Object.assign({ ...state },
            action[PROPERTIES_TO_ADD_KEY]));
        } else {
          const previousObject = clonesArray[clonesArray.length - 1];

          clonesArray.push(Object
            .assign({ ...previousObject }, action[PROPERTIES_TO_ADD_KEY]));
        }
        break;

      case REMOVE_PROPERTIES_TYPE:
        if (clonesArray.length > 0) {
          const previousObjectCopy
            = { ...clonesArray[clonesArray.length - 1] };

          for (const key of action[PROPERTIES_TO_REMOVE_KEY]) {
            delete previousObjectCopy[key];
          }

          clonesArray.push(previousObjectCopy);
        } else {
          const initialObjectCopy = { ...state };

          for (const key of action[PROPERTIES_TO_REMOVE_KEY]) {
            delete initialObjectCopy[key];
          }

          clonesArray.push(initialObjectCopy);
        }
        break;

      case CLEAR_TYPE:
        clonesArray.push({});
        break;
    }
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
