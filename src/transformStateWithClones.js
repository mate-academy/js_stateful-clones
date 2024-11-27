'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  function createClone(obj) {
    return { ...obj };
  }

  const cloneOfState = createClone(state);
  const resultArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneOfState, extraData);
        break;

      case 'removeProperties':
        for (const arrKey of keysToRemove) {
          if (cloneOfState.hasOwnProperty(arrKey)) {
            delete cloneOfState[arrKey];
          }
        }
        break;

      case 'clear':
        for (const objKey in cloneOfState) {
          delete cloneOfState[objKey];
        }
        break;

      default:
        throw new Error('Invalid action type');
    }

    resultArray.push(createClone(cloneOfState));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
