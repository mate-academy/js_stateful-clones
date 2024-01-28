'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const resArray = [];

  for (let i = 0; i < actions.length; i++) {
    const currentObject = actions[i];
    const nextState = { ...currentState };

    if (currentObject.type === 'addProperties') {
      const addedProperties = currentObject.extraData;

      for (const key in addedProperties) {
        nextState[key] = addedProperties[key];
      }
      resArray.push({ ...nextState });
    }

    if (currentObject.type === 'removeProperties') {
      const removedProperties = currentObject.keysToRemove;

      for (let j = 0; j < removedProperties.length; j++) {
        delete nextState[removedProperties[j]];
      }
      resArray.push({ ...nextState });
    }

    if (currentObject.type === 'clear') {
      Object.keys(nextState).forEach((key) => {
        delete nextState[key];
      });
      resArray.push({ ...nextState });
    }

    currentState = { ...nextState };
  }

  return resArray;
}

module.exports = transformStateWithClones;
