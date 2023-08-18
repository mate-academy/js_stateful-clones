'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const cloneState = { ...state };
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case ADD:
        Object.assign(cloneState, extraData);
        break;

      case REMOVE: {
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;
      }

      case CLEAR: {
        for (const key of Object.keys(cloneState)) {
          delete cloneState[key];
        }
        break;
      }
      default:
        return (`Unknown action type ${type}`);
    }
    stateArray.push({ ...cloneState });
  }

  return stateArray;
}

// And i did it in other way(i think this one isn't good)
// eslint-disable-next-line no-unused-vars
function transformStateWithClonesAnotherWay(state, actions) {
  const stateArray = [];
  let clonestate = { ...state };

  for (const typeOfAction of actions) {
    const valuesAction = Object.values(typeOfAction);
    const typeOfActions = valuesAction[0];
    const argumentsOfAction = valuesAction[1];

    if (typeOfActions === 'clear') {
      clonestate = {};
    }

    for (const key in valuesAction[1]) {
      if (typeOfActions === 'addProperties') {
        clonestate[key] = argumentsOfAction[key];
      }

      if (typeOfActions === 'removeProperties') {
        delete clonestate[argumentsOfAction[key]];
      }
    }
    stateArray.push({ ...clonestate });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
