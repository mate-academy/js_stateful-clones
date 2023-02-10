'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    const currentStateObject = result[result.length - 1];

    switch (action.type) {
      case 'addProperties':
        result.push(
          Object.assign({}, currentStateObject || state, action.extraData)
        );
        break;

      case 'removeProperties':
        const object = Object.assign({}, currentStateObject || state);

        action.keysToRemove.forEach(key => delete object[key]);

        result.push(object);
        break;

      case 'clear':
        const clearedObject = Object.assign({}, currentStateObject || state);

        Object.keys(clearedObject).forEach(key => {
          delete clearedObject[key];
        });

        result.push(clearedObject);
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
