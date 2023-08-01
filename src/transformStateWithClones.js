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

    let elementarray = { ...array[array.length - 1] };

    switch (actionRequired) {
      case 'addProperties':
        Object.assign(elementarray, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete elementarray[key];
        }
        break;

      case 'clear':
        for (const key in elementarray) {
          delete elementarray[key];
        };
        break;
    }

    array.push(elementarray);
  }
  array.shift();

  return array;
}

module.exports = transformStateWithClones;
