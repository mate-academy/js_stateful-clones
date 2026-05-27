'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const res = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };

        break;

      case 'removeProperties':
        const filterKeys = Object.keys(stateCopy).filter(
          (key) => !action.keysToRemove.includes(key),
        );

        const newCopy = {};

        for (const key of filterKeys) {
          newCopy[key] = stateCopy[key];
        }
        stateCopy = newCopy;

        break;

      case 'clear':
        stateCopy = {};

        break;

      default:
        break;
    }
    res.push(stateCopy);
  });

  return res;
}

module.exports = transformStateWithClones;
