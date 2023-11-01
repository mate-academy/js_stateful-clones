'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tmpState = {};

  Object.assign(tmpState, state);

  const arrRes = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(tmpState, action.extraData);

        const obj1 = {};

        assignObj(obj1, tmpState, arrRes);
        break;

      case 'removeProperties':
        removeProperties(tmpState, action.keysToRemove);

        const obj2 = {};

        assignObj(obj2, tmpState, arrRes);
        break;

      case 'clear':
        removeProperties(tmpState, Object.keys(tmpState));

        const obj3 = {};

        assignObj(obj3, tmpState, arrRes);
        break;
    }
  }

  return arrRes;
}

function assignObj(newObj, initialObj, arrayRes) {
  Object.assign(newObj, initialObj);
  arrayRes.push(newObj);

  return arrayRes;
}

function addProperties(tmpState, extraData) {
  return Object.assign(tmpState, extraData);
}

function removeProperties(tmpState, keysToRemove) {
  for (const key of keysToRemove) {
    delete tmpState[key];
  }

  return tmpState;
}

module.exports = transformStateWithClones;
