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
        addP(tmpState, action.extraData);

        const obj1 = {};

        Object.assign(obj1, tmpState);
        arrRes.push(obj1);
        break;

      case 'removeProperties':
        removeP(tmpState, action.keysToRemove);

        const obj2 = {};

        Object.assign(obj2, tmpState);
        arrRes.push(obj2);
        break;

      case 'clear':
        removeP(tmpState, Object.keys(tmpState));

        const obj3 = {};

        Object.assign(obj3, tmpState);
        arrRes.push(obj3);
        break;
    }
  }

  return arrRes;
}

function addP(tmpState, extraData) {
  return Object.assign(tmpState, extraData);
}

function removeP(tmpState, keysToRemove) {
  for (const key of keysToRemove) {
    delete tmpState[key];
  }

  return tmpState;
}

module.exports = transformStateWithClones;
