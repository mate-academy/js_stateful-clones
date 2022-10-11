'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    arr.push(addAction(action));
  }

  return arr;

  function addAction(action) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...action.extraData,
        };

        return stateCopy;

      case 'removeProperties':
        const stateCopyСopy = {
          ...stateCopy,
        };

        for (const key of action.keysToRemove) {
          delete stateCopyСopy[key];
        }
        stateCopy = { ...stateCopyСopy };

        return stateCopy;

      case 'clear':
        stateCopy = {};

        return stateCopy;

      default:
        return stateCopy;
    }
  }
}

module.exports = transformStateWithClones;
