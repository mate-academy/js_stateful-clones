'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let cloneState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(cloneState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const elem of action.keysToRemove) {
          delete cloneState[elem];
        }
        break;
      }

      case 'clear': {
        cloneState = {};
        break;
      }
    };

    resultArray.push(Object.assign({}, cloneState));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
