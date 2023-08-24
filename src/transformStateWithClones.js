'use strict';

function transformStateWithClones(state, actions) {
  const compArr = [];
  const compObj = { ...state };
  const result = [];

  result.push(state);

  for (let i = 0; i < actions.length; i++) {
    const objOfActions = actions[i];
    const objForWorkKey = objOfActions.type;
    const objForWorkValue = objOfActions.extraData
    || objOfActions.keysToRemove;
    const objForWork = {};

    objForWork[objForWorkKey] = objForWorkValue;
    compArr.push(objForWork);
  }

  for (let i = 0; i < compArr.length; i++) {
    const el = compArr[i];
    const controlKey = Object.keys(el)[0];

    switch (controlKey) {
      case 'clear':
        for (const key in compObj) {
          delete compObj[key];
        }
        result.push(compObj);
        break;
      case 'addProperties':
        const objForWorkAdd = { ...result[result.length - 1] };

        Object.assign(objForWorkAdd, el.addProperties);
        result.push(objForWorkAdd);
        break;
      case 'removeProperties':
        const objForWorkRem = { ...result[result.length - 1] };
        const keysToDelete = el.removeProperties;

        for (const itemToDel of keysToDelete) {
          for (const key in objForWorkRem) {
            if (itemToDel === key) {
              delete objForWorkRem[itemToDel];
            }
          }
        }
        result.push(objForWorkRem);
        break;
      default:
        return 'Нет таких значений';
    }
  }

  result.splice(0, 1);

  return result;
}

module.exports = transformStateWithClones;
