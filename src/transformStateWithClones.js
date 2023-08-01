'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let actionRequired = '';
  const stateCopy = { ...state };
  const array = [Object.assign({}, stateCopy)];

  for (const action of actions) {
    actionRequired = action.type;

    const elementArray = { ...array[array.length - 1] };

    switch (actionRequired) {
      case 'addProperties':
        Object.assign(elementArray, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete elementArray[key];
        }
        break;

      case 'clear':
        for (const key in elementArray) {
          delete elementArray[key];
        };
        break;
    }

    array.push(elementArray);
  }
  array.shift();

  return array;
}

module.exports = transformStateWithClones;
