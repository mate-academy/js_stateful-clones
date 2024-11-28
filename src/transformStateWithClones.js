'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case 'clear': {
        stateCopy = {};
        break;
      }

      default: {
        // console.log('Error, unknown type');
      }
    }

    resultArray.push(Object.assign({}, stateCopy));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
