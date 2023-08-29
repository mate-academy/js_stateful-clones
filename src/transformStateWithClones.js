'use strict';

function transformStateWithClones(state, actions) {
  const compObj = { ...state };
  const CLEAR = 'clear';
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const result = [];

  result.push(state);

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case CLEAR:
        for (const key in compObj) {
          delete compObj[key];
        }
        result.push(compObj);
        break;
      case ADD:
        const objForWorkAdd = { ...result[result.length - 1] };

        Object.assign(objForWorkAdd, extraData);
        result.push(objForWorkAdd);
        break;
      case REMOVE:
        const objForWorkRem = { ...result[result.length - 1] };

        for (const itemToDel of keysToRemove) {
          for (const key in objForWorkRem) {
            if (itemToDel === key) {
              delete objForWorkRem[itemToDel];
            }
          }
        }
        result.push(objForWorkRem);
        break;
      default:
        return 'No such values';
    }
  }
  result.splice(0, 1);

  return result;
}

module.exports = transformStateWithClones;
