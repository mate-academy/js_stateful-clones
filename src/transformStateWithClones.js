'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  let lastObject;
  let nextObject;
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (i === 0) {
      lastObject = { ...stateCopy };
    } else {
      lastObject = { ...resultArray[i - 1] };
    }

    switch (action.type) {
      case 'clear':
        nextObject = {};
        resultArray[i] = { ...nextObject };
        break;

      case 'addProperties':
        const addObject = action.extraData;

        nextObject = Object.assign(lastObject, addObject);
        resultArray[i] = { ...nextObject };
        break;

      case 'removeProperties':
        const removeArray = action.keysToRemove;

        nextObject = { ...lastObject };

        for (const removeKey of removeArray) {
          delete nextObject[removeKey];
        }
        resultArray[i] = { ...nextObject };
        break;

      default:
        return 'Some actions have wrong type';
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
