'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfObjects = [];
  let copyState = {};
  let objectOfEveryProperty = {};

  Object.assign(copyState, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        objectOfEveryProperty = Object.assign({}, copyState, obj.extraData);
        arrOfObjects.push(objectOfEveryProperty);
        copyState = {};
        Object.assign(copyState, objectOfEveryProperty);
        break;
      case 'removeProperties':
        obj.keysToRemove.forEach(elem => delete copyState[elem]);
        objectOfEveryProperty = Object.assign({}, copyState);
        copyState = {};
        Object.assign(copyState, objectOfEveryProperty);
        arrOfObjects.push(objectOfEveryProperty);
        break;

      case 'clear':
        for (const elem in copyState) {
          delete copyState[elem];
        }
        objectOfEveryProperty = Object.assign({}, copyState);
        arrOfObjects.push(objectOfEveryProperty);
        break;

      default:
        return null;
    }
  }

  return arrOfObjects;
}

module.exports = transformStateWithClones;
