'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const initialClonedObj = { ...state };
  const modifiedObjs = [];

  for (const { type, ...data } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(initialClonedObj, { ...data.extraData });
        break;

      case 'removeProperties':
        for (const key of data.keysToRemove) {
          delete initialClonedObj[key];
        }
        break;

      case 'clear':
        for (const key in initialClonedObj) {
          delete initialClonedObj[key];
        }
        break;
    }

    modifiedObjs.push({ ...initialClonedObj });
  }

  return modifiedObjs;
}

module.exports = transformStateWithClones;
