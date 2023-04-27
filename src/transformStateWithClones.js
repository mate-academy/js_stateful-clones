'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const newObject = [];

  for (const current of actions) {
    const objectAddProperties = {};
    const objectRemoveKeys = {};
    const objectClearKeys = {};

    if (current.type === 'addProperties') {
      Object.assign(objectAddProperties, newState, ...[current.extraData]);

      newObject.push(objectAddProperties);
      newState = { ...objectAddProperties };
      // console.log(newState)
    }

    if (current.type === 'removeProperties') {
      Object.assign(objectRemoveKeys, newState);

      const removeKeys = current.keysToRemove;

      removeKeys.forEach(function(item, i) {
        delete objectRemoveKeys[item];
      });

      newObject.push(objectRemoveKeys);
      newState = { ...objectRemoveKeys };
    }

    if (current.type === 'clear') {
      Object.assign(objectClearKeys, newState);

      for (const key in newState) {
        delete objectClearKeys[key];
      }

      newObject.push(objectClearKeys);
      newState = { ...objectClearKeys };
    }
  }

  return newObject;
}

module.exports = transformStateWithClones;
