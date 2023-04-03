'use strict';

function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const cloneState = { ...state };

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          delete cloneState[value];
        };
        break;

      case 'clear':
        Object.keys(cloneState).forEach((el) => {
          delete cloneState[el];
        });
        break;
      default: throw new Error('type is not found');
    };
    arrayResult.push({ ...cloneState });
  }

  return arrayResult;
};

module.exports = transformStateWithClones;
