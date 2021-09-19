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

  for (const object of actions) {
    if (arrayObjects.length === 0) {
      currentState = state;
    } else {
      currentState = arrayObjects[arrayObjects.length - 1];
    }

    if (object.type === 'addProperties') {
      currentState = {
        ...currentState, ...object.extraData,
      };
      arrayObjects.push(currentState);
    }

    if (object.type === 'removeProperties') {
      let copyLastObject = {};

      if (arrayObjects.length === 0) {
        copyLastObject = { ...state };
      } else {
        const lastObject = arrayObjects[arrayObjects.length - 1];

        copyLastObject = { ...lastObject };
      }

      const arrayKeysToRemove = object.keysToRemove;

      for (const key in arrayKeysToRemove) {
        const keyToRemove = arrayKeysToRemove[key];

        delete copyLastObject[keyToRemove];
      }

      arrayObjects.push(copyLastObject);
    }

    if (object.type === 'clear') {
      const emptyObject = {};

      arrayObjects.push(emptyObject);
    }
  }

  return arrayObjects;
}

module.exports = transformStateWithClones;
