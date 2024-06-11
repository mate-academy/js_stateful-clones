'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = state;

  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const addProperties = { ...currentState, ...action.extraData };

        currentState = addProperties;
        break;
      }

      case 'removeProperties': {
        const actionProperty = action.keysToRemove;
        const removeProperties = { ...currentState };

        for (const i of actionProperty) {
          delete removeProperties[i];
        }
        currentState = removeProperties;
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }
    }

    array.push(currentState);
  }

  return array;
}

module.exports = transformStateWithClones;
