'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const result = [];
  let step = 0;

  for (const action of actions) {
    const obj = result.length < 1
      ? { ...state }
      : Object.assign({}, result[step]);

    if (result.length > 0) {
      step++;
    };

    switch (action.type) {
      case 'addProperties':
        result.push(Object.assign({}, obj, action.extraData));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        };
        result.push(obj);
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }

        result.push(obj);
        break;

      default:
        return [];
    };
  };

  return result;
}

module.exports = transformStateWithClones;
