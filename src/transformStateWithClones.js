'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = simpleObjectClone(state);
  const stateArr = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        stateArr.push(simpleObjectClone(currentState));
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(k => {
          if (currentState.hasOwnProperty(k)) {
            delete currentState[k];
          }
        });
        stateArr.push(simpleObjectClone(currentState));
        break;

      case 'clear':
        currentState = {};
        stateArr.push({});
        break;

      default:
        return false;
    };
  });

  return stateArr;
}

function simpleObjectClone(obj) {
  const newObj = {};

  for (const key in obj) {
    newObj[key] = obj[key];
  }

  return newObj;
}

module.exports = transformStateWithClones;
