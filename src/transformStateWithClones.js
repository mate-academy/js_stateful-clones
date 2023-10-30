'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newClone = { ...state };
  const stateClones = [];

  actions.forEach(action => {
    stateClones.push(createClone(newClone, action));
  });

  return stateClones;
}

function createClone(newClone, action) {
  switch (action.type) {
    case 'addProperties':
      for (const key in action.extraData) {
        newClone[key] = action.extraData[key];
      };

      return { ...newClone };

    case 'removeProperties':
      for (const el in action.keysToRemove) {
        if (action.keysToRemove[el] in newClone) {
          delete newClone[action.keysToRemove[el]];
        }
      };

      return Object.keys(newClone).length === 0 ? {} : { ...newClone };

    case 'clear':
      for (const key in newClone) {
        delete newClone[key];
      }

      return {};

    default: throw new Error('Enter correct value');
  }
}

module.exports = transformStateWithClones;
