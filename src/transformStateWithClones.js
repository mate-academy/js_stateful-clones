'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const tempObject = Object.assign({}, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(tempObject, obj.extraData);
        break;

      case 'removeProperties':
        for (const el of obj.keysToRemove) {
          for (const key in tempObject) {
            if (key === el) {
              delete tempObject[key];
            }
          }
        }
        break;

      case 'clear':
        for (const key in tempObject) {
          delete tempObject[key];
        }
    }

    result.push(Object.assign({}, tempObject));
  }

  return result;
}

module.exports = transformStateWithClones;
