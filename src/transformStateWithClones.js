'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newObject = { ...state };

  for (const oneAction of actions) {
    if (oneAction.type === 'addProperties') {
      const newObjectAdd = {
        ...newObject, ...oneAction.extraData,
      };

      newArray.push(newObjectAdd);
      newObject = { ...newObjectAdd };
    } else if (oneAction.type === 'removeProperties') {
      const newObjectDel = { ...newObject };

      for (const arr of oneAction.keysToRemove) {
        delete newObjectDel[arr];
      }
      newArray.push(newObjectDel);
      newObject = { ...newObjectDel };
    } else if (oneAction.type === 'clear') {
      const clear = {};

      newArray.push(clear);
      newObject = {};
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
