'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    // if (action.type === 'addProperties') {
    //   Object.assign(stateClone, { ...action.extraData });
    // }

    // if (action.type === 'removeProperties') {
    //   for (const key of action.keysToRemove) {
    //     delete stateClone[key];
    //   }
    // }

    // if (action.type === 'clear') {
    //   for (const key in stateClone) {
    //     delete stateClone[key];
    //   }
    // }

    switch (true) {
      case action.type === 'addProperties': {
        Object.assign(stateClone, { ...action.extraData });
        break;
      }

      case action.type === 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      }

      case action.type === 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      }
    }

    result.push(stateClone);
    stateClone = { ...stateClone };
  }

  return result;
}

module.exports = transformStateWithClones;
