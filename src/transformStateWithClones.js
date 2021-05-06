'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  let newState = { ...state };

  for (const object of actions) {
    const finalyState = { ...newState };
    const propert = object.extraData;
    const remove = object.keysToRemove;
    const type = object.type;

    if (type === 'addProperties') {
      Object.assign(finalyState, propert);
    }

    if (type === 'removeProperties') {
      for (const keyOfRemove of remove) {
        delete finalyState[keyOfRemove];
      }
    }

    if (type === 'clear') {
      for (const keyOfState in finalyState) {
        delete finalyState[keyOfState];
      }
    }
    newActions.push(finalyState);
    newState = finalyState;
  }

  return newActions;
}

module.exports = transformStateWithClones;
