'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resObject = { ...state };
  const massState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(resObject, action.extraData);
        massState.push({ ...resObject });
        break;

      case 'removeProperties':
        removeProperties(resObject, action.keysToRemove);
        massState.push({ ...resObject });
        break;

      case 'clear':
        clearProperties(resObject);
        massState.push({ ...resObject });
        break;
    }
  }

  return massState;
}

function addProperties(resObject, extraData) {
  Object.assign(resObject, extraData);
}

function removeProperties(resObject, keysToRemove) {
  for (const key of keysToRemove) {
    delete resObject[key];
  }
}

function clearProperties(resObject) {
  for (const key in resObject) {
    delete resObject[key];
  }
}

module.exports = transformStateWithClones;
