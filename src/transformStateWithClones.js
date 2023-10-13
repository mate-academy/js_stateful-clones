'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  function transform(object, action) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(object, action.extraData);
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            if (key in object) {
              delete object[key];
            }
          }
        }
        break;

      case 'clear':
        for (const key in object) {
          delete object[key];
        }
        break;
    }
  }

  for (const action of actions) {
    transform(newState, action);
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
