'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = Object.assign({}, state);
  const resultArray = [];

  for (const action of actions) {
    const whatWeMustDo = action.type;
    const isAdding = whatWeMustDo === 'addProperties';
    const isDeleting = whatWeMustDo === 'removeProperties';
    const isClearing = whatWeMustDo === 'clear';

    switch (true) {
      case (isAdding):
        Object.assign(copyState, action.extraData);
        break;

      case (isDeleting):
        deletProp(copyState, action.keysToRemove);
        break;

      case (isClearing):
        clearingTheObject(copyState);
        break;

      default:
        return 'Unknow error';
    }

    resultArray.push(Object.assign({}, copyState));
  }

  return resultArray;
}

function clearingTheObject(object) {
  for (const key in object) {
    delete object[key];
  }

  return object;
}

function deletProp(object, props) {
  for (const prop of props) {
    delete object[prop];
  }

  return object;
}

module.exports = transformStateWithClones;
