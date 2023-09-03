'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayObjects = [];
  let currentState = { ...state };

  for (const action of actions) {
    let copyCurrentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        copyCurrentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        const arrayKeysToRemove = action.keysToRemove;

        for (const key in arrayKeysToRemove) {
          const keyToRemove = arrayKeysToRemove[key];

          delete copyCurrentState[keyToRemove];
        }
        break;

      case 'clear': copyCurrentState = {};
        break;
    }
    currentState = copyCurrentState;

    arrayObjects.push(copyCurrentState);
  }

  return arrayObjects;
}

module.exports = transformStateWithClones;
