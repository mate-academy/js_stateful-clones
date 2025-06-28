'use strict';

function transformStateWithClones(state, actions) {
  let cloneObject = { ...state };
  const result = [];

  for (const action of actions) {
    cloneObject = { ...cloneObject };

    if (action.type === 'addProperties') {
      Object.assign(cloneObject, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneObject[key];
      }
    } else if (action.type === 'clear') {
      for (const key in cloneObject) {
        delete cloneObject[key];
      }
    }
    result.push({ ...cloneObject });
  }

  return result;
}

module.exports = transformStateWithClones;
