'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const add0 = {};
  const rem0 = {};
  const clear0 = {};
  const result = {};
  const resultMassive = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        if (resultMassive.length > 0) {
          Object.assign(result, key.extraData);

          const add = Object.assign({}, result);

          resultMassive.push(add);
        } else {
          Object.assign(result, state, key.extraData);
          Object.assign(add0, result);
          resultMassive.push(add0);
        };
        break;

      case 'removeProperties':
        if (resultMassive.length > 0) {
          const rem = Object.assign({}, result);

          for (const f of key.keysToRemove) {
            delete result[f];
            delete rem[f];
          };
          resultMassive.push(rem);
        } else {
          Object.assign(result, state);
          Object.assign(rem0, result);

          for (const f of key.keysToRemove) {
            delete rem0[f];
            delete result[f];
          };
          resultMassive.push(rem0);
        };
        break;

      case 'clear':
        if (resultMassive.length > 0) {
          const clear = Object.assign({}, result);

          for (const y in clear) {
            delete result[y];
            delete clear[y];
          };
          resultMassive.push(clear);
        } else {
          Object.assign(clear0, result);
          resultMassive.push(clear0);
        };
        break;
    }
  }

  return resultMassive;
}

module.exports = transformStateWithClones;
