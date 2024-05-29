'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesStack = [];

  for (const action of actions) {
    const currentState = statesStack.length
      ? statesStack[statesStack.length - 1]
      : state;

    switch (action.type) {
      case 'addProperties':
        statesStack.push(addProperties(currentState, action.extraData));
        break;

      case 'removeProperties':
        statesStack.push(removeProperties(currentState, action.keysToRemove));
        break;

      case 'clear':
        statesStack.push(clearProperties(currentState));
        break;
    }
  }

  function addProperties(lastElementStack, extraData) {
    return Object.assign({}, lastElementStack, extraData);
  }

  function removeProperties(lastElementStack, keysToRemove) {
    const newObject = { ...lastElementStack };

    for (const key of keysToRemove) {
      delete newObject[key];
    }

    return newObject;
  }

  function clearProperties(lastElementStack) {
    return {};
  }

  return statesStack;
}

module.exports = transformStateWithClones;
