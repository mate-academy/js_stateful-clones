'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrOfCopies = [];

  for (const action of actions) {
    let cloneState = { ...newState };

    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    } else if (action.type === 'removeProperties'
    && action.keysToRemove) {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
    } else if (action.type === 'clear') {
      cloneState = {};
    }
    arrOfCopies.push(cloneState);
    newState = cloneState;
  }

  return arrOfCopies;
}

module.exports = transformStateWithClones;
