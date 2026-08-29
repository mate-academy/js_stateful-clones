'use strict';

function transformStateWithClones(state, actions) {
  const arr = [];
  let obj = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        obj = { ...obj, ...item.extraData };
        arr.push({ ...obj });
        break;

      case 'removeProperties': {
        for (const key of item.keysToRemove) {
          const { [key]: omitted, ...rest } = obj;

          obj = rest;
        }
        arr.push({ ...obj });
        break;
      }

      case 'clear':
        obj = {};
        arr.push({ ...obj });
        break;

      default:
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
