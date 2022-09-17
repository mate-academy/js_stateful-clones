'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const tranformedObject = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(tranformedObject, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete tranformedObject[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in tranformedObject) {
        delete tranformedObject[key];
      }
    }

    transformedState.push({ ...tranformedObject });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
