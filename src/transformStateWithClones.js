'use strict';

function transformStateWithClones(state, actions) {
  const currentState = Object.assign({}, state);
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        for (const key in currentState) {
          delete currentState[key];
        }
    }
    resultArray.push(Object.assign({}, currentState));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
