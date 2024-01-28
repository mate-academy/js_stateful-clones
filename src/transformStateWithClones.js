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
    let nextState = {};

    switch (currentObject.type) {
      case 'addProperties':
        nextState = Object.assign({}, currentState, currentObject.extraData);
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        const removedProperties = currentObject.keysToRemove;

        for (let j = 0; j < removedProperties.length; j++) {
          delete nextState[removedProperties[j]];
        }
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        break;
    }

    resArray.push({ ...nextState });
    currentState = { ...nextState };
  }

  return resArray;
}

module.exports = transformStateWithClones;
