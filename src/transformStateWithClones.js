'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = Object.assign({}, state);
  const transformedArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformedState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete transformedState[key];
        };
        break;
      case 'clear':
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
    }

    transformedArray.push({ ...transformedState });
  }

  return transformedArray;
}

module.exports = transformStateWithClones;
