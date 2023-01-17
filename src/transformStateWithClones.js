'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addProps = (current, props) => {
    const newObject = { ...current };

    Object.assign(newObject, props);

    return newObject;
  };

  const removeProps = (current, props) => {
    const newObject = { ...current };

    for (const key of props) {
      delete newObject[key];
    }

    return newObject;
  };

  const resultArray = [];
  const actionsToDo = [ ...actions ];
  let currentState = state;

  for (const action of actionsToDo) {
    switch (action.type) {
      case 'addProperties':
        const added = addProps(currentState, action.extraData);

        resultArray.push(added);
        currentState = added;
        break;
      case 'removeProperties':
        const removed = removeProps(currentState, action.keysToRemove);

        resultArray.push(removed);
        currentState = removed;
        break;
      default:
        resultArray.push({});
        currentState = {};
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
