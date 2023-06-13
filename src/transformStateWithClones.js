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

        const cloneAfterAddingProperties = createClone(cloneOfState);

        resultArray.push(cloneAfterAddingProperties);
        break;

      case 'removeProperties':
        for (const arrKey of keysToRemove) {
          if (cloneOfState.hasOwnProperty(arrKey)) {
            delete cloneOfState[arrKey];
          }
        }

        const cloneAfterRemovingProperties = createClone(cloneOfState);

        resultArray.push(cloneAfterRemovingProperties);
        break;

      case 'clear':
        for (const objKey in cloneOfState) {
          delete cloneOfState[objKey];
        }

        const cloneAfterClearing = createClone(cloneOfState);

        resultArray.push(cloneAfterClearing);
        break;

      default:
        return 'Invalid action type';
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
