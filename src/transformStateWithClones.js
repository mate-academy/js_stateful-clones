'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = state;
  const newArr = [];

  for (const actionKey of actions) {
    if (actionKey.type === 'addProperties') {
      const copyProp = Object.assign({}, newObject, actionKey.extraData);

      newArr.push(copyProp);
      newObject = copyProp;
    } else if (actionKey.type === 'removeProperties') {
      const remProp = Object.assign({}, newObject);

      for (const removeKey of actionKey.keysToRemove) {
        delete remProp[removeKey];
      }

      newArr.push(remProp);
      newObject = remProp;
    } else if (actionKey.type === 'clear') {
      newArr.push({});
      newObject = {};
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
