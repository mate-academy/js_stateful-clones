'use strict';

function transformStateWithClones(state, actions) {
  const arr = [];
  let stateCopy = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties': {
        stateCopy = { ...stateCopy, ...item.extraData };
        arr.push({ ...stateCopy });
        break;
      }

      case 'removeProperties': {
        stateCopy = { ...stateCopy };

        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        }
        arr.push({ ...stateCopy });
        break;
      }

      case 'clear': {
        stateCopy = {};
        arr.push({ ...stateCopy });
        break;
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
