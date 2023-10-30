'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  let tempObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(tempObject, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete tempObject[key];
        }
        break;

      case CLEAR:
        tempObject = {};
        break;
    }
    resultArray.push({ ...tempObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
