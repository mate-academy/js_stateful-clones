'use strict';

const ACTION_CASES = {
  add: 'addProperties',
  remove: 'removeProperties',
  clear: 'clear',
};

/**
 * Deep clone function to create a copy of an object.
 * @param {Object} obj - The object to be cloned.
 * @returns {Object} - The deep clone of the object.
 */
function simpleClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const objCopy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = simpleClone(obj[key]);
    }
  }

  return objCopy;
}

function transformState(currentStateCopy, action) {
  const { type, extraData, keysToRemove } = action;

  switch (type) {
    case ACTION_CASES.add:
      return {
        ...currentStateCopy,
        ...extraData,
      };
    case ACTION_CASES.remove:
      const newStateCopy = simpleClone(currentStateCopy);

      keysToRemove.forEach(key => delete newStateCopy[key]);

      return newStateCopy;
    case ACTION_CASES.clear:
      return {};
    default:
      return currentStateCopy;
  }
}

function transformStateWithClones(state, actions) {
  const resultArray = [simpleClone(state)];

  for (const action of actions) {
    const currentStateCopy = simpleClone(resultArray[resultArray.length - 1]);

    resultArray.push(transformState(currentStateCopy, action));
  }

  return resultArray.slice(1);
}

module.exports = transformStateWithClones;
