'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = {
    ...state,
  };
  const resultMassive = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        copy = {
          ...copy,
          ...key.extraData,
        };
        break;

      case 'removeProperties':
        for (const f of key.keysToRemove) {
          delete copy[f];
        };
        break;

      case 'clear':
        for (const y in copy) {
          delete copy[y];
        };
        break;
    };

    const result = {
      ...copy,
    };

    resultMassive.push(result);
  };

  return resultMassive;
};

module.exports = transformStateWithClones;
