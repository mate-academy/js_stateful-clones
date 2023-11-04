'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let transformState = { ...state };
  const newState = [];

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':
        Object.assign(transformState, property.extraData);

        break;

      case 'removeProperties':
        for (const key of property.keysToRemove) {
          delete transformState[key];
        }

        break;

      case 'clear':
        transformState = {};

        break;
    }

    newState.push({ ...transformState });
  }

  return newState;
}

module.exports = transformStateWithClones;
