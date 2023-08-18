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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;
      }

      case 'clear': {
        for (const key of Object.keys(cloneState)) {
          delete cloneState[key];
        }
        break;
      }
      default:
        return (`Unknown action type ${action.type}`);
    }
    stateArray.push({ ...cloneState });
  }

  return stateArray;
}



// And i did it in other way(i think this one isn't good)
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

const state = {
  foo: 'bar',
  bar: 'foo',
};

console.log(
  transformStateWithClones(state, [
    {
      type: 'addProperties',
      extraData: {
        name: 'Jim',
        hello: 'world',
      },
    },
  ])
);
module.exports = transformStateWithClones;
