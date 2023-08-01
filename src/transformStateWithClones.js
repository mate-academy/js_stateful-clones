'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let ACTION_REQUIRED = '';
  const stateCopy = { ...state };
  const ARRAY = [Object.assign({}, stateCopy)];

  for (const action of actions) {
    ACTION_REQUIRED = action.type;
    let elementArray = Object.assign({}, ARRAY[ARRAY.length - 1]);

    switch (ACTION_REQUIRED) {
      case 'addProperties':
        elementArray = Object.assign(elementArray, action.extraData)
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

    ARRAY.push(elementArray);
  }
  ARRAY.shift();
  return ARRAY;
}

module.exports = transformStateWithClones;
