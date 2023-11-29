'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objectCopy = { ...state };
  const returningArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        objectCopy = {
          ...objectCopy, ...action.extraData,
        };
        break;

      case 'removeProperties':
        objectCopy = { ...objectCopy };

        for (const key of action.keysToRemove) {
          delete objectCopy[key];
        }
        break;

      case 'clear':
        objectCopy = {};
        break;
      case undefined:
        return 0;
    }

    returningArr.push({ ...objectCopy });
  }

  return returningArr;
}

module.exports = transformStateWithClones;
