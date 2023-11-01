'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tmpState = Object.assign({}, state);

  const arrRes = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const obj1 = {};

        addProperties(tmpState, action.extraData, obj1, arrRes);

        break;

      case 'removeProperties':
        const obj2 = {};

        removeProperties(tmpState, action.keysToRemove, obj2, arrRes);

        break;

      case 'clear':
        const obj3 = {};

        removeProperties(tmpState, Object.keys(tmpState), obj3, arrRes);

        break;
    }
  }

  return arrRes;
}

function addProperties(tmpState, extraData, newObj, arrayRes) {
  Object.assign(tmpState, extraData);
  Object.assign(newObj, tmpState);
  arrayRes.push(newObj);

  return arrayRes;
}

function removeProperties(tmpState, keysToRemove, newObj, arrayRes) {
  for (const key of keysToRemove) {
    delete tmpState[key];
  }
  Object.assign(newObj, tmpState);
  arrayRes.push(newObj);

  return arrayRes;
}

module.exports = transformStateWithClones;
