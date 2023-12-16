'use strict';

/**
 * Deep clone function to create a copy of an object.
 * @param {Object} obj - The object to be cloned.
 * @returns {Object} - The deep clone of the object.
 */
function transformStateWithClones(state, actions) {
  const resultArray = [simpleClone(state)];

  for (const action of actions) {
    const currentStateCopy = simpleClone(resultArray[resultArray.length - 1]);

    resultArray.push(transformState(currentStateCopy, action));
  }

  return resultArray.slice(1);
}

function transformState(currentStateCopy, action) {
  switch (action.type) {
    case ACTION_CASES.add:
      return {
        ...currentStateCopy,
        ...action.extraData,
      };
    case 'removeProperties':
      action.keysToRemove.forEach(key => delete currentStateCopy[key]);

      return currentStateCopy;
    case 'clear':
      return {};
    default:
      return currentStateCopy;
  }
}

function simpleClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => simpleClone(item));
  }

  const objCopy = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = simpleClone(obj[key]);
    }
  }

  return objCopy;
}

const ACTION_CASES = {
  add: 'addProperties',
};

module.exports = transformStateWithClones;
