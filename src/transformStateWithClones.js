'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayObjects = [];
  let currentState = {};

  for (const action of actions) {
    let resultObject = {};

    if (arrayObjects.length === 0) {
      currentState = state;
    } else {
      currentState = arrayObjects[arrayObjects.length - 1];
    }

    switch (action.type) {
      case 'addProperties':
        resultObject = {
          ...currentState, ...action.extraData,
        };

        break;

      case 'removeProperties':
        const copyLastObject = { ...currentState };

        const arrayKeysToRemove = action.keysToRemove;

        for (const key in arrayKeysToRemove) {
          const keyToRemove = arrayKeysToRemove[key];

          delete copyLastObject[keyToRemove];
        }

        resultObject = copyLastObject;
        break;

      case 'clear':
        break;
    }
    arrayObjects.push(resultObject);
  }

  return arrayObjects;
}

module.exports = transformStateWithClones;
