'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    transform(stateCopy, action);
  }

  function transform(result, action) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(result, action.extraData);
        array.push({ ...stateCopy });
        break;

      case 'removeProperties': {
        for (const word of action.keysToRemove) {
          delete stateCopy[word];
        }

        array.push({ ...stateCopy });
        break;
      }

      case 'clear': {
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        array.push({ ...stateCopy });
      }
    }
  }

  return array;
}

module.exports = transformStateWithClones;
