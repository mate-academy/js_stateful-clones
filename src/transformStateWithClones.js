'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrOfTransformations = [];

  for (const action of actions) {
    arrOfTransformations.push(transform(stateCopy, action));
  }

  return arrOfTransformations;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);

      return { ...state };

    case 'removeProperties':
      for (const keys of action.keysToRemove) {
        if (keys in state) {
          delete state[keys];
        }
      }

      return { ...state };

    case 'clear':
      for (const key in state) {
        delete state[key];
      }

      return { ...state };

    default:
      throw new Error('Something went wrong');
  }
}

module.exports = transformStateWithClones;
