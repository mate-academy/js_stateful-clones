'use strict';

/**
 * Deep clone function to create a copy of an object.
 * @param {Object} obj - The object to be cloned.
 * @returns {Object} - The deep clone of the object.
 */
function transformStateWithClones(state, actions) {
  const resultArray = [simpleClone(state)];

  for (const action of actions) {
    let currentStateCopy = simpleClone(resultArray[resultArray.length - 1]);

    switch (action.type) {
      case 'addProperties':
        currentStateCopy = {
          ...currentStateCopy, ...action.extraData,
        };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentStateCopy[key]);
        break;
      case 'clear':
        currentStateCopy = {};
        break;
      default:
        break;
    }

    resultArray.push(currentStateCopy);
  }

  return resultArray.slice(1);
}

function simpleClone(obj) { // Странный костыль. Очень долго мучался
  if (obj === null || typeof obj !== 'object') {
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

module.exports = transformStateWithClones;
