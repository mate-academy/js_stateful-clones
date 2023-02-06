'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  actions.forEach((elem, index) => {
    switch (elem.type) {
      case ('addProperties'):
        const a = Object.assign({}, copy, elem.extraData);

        Object.assign(copy, elem.extraData);
        result.push(a);
        break;

      case ('removeProperties'):
        elem.keysToRemove.forEach(rem => {
          delete copy[rem];
        });

        const b = Object.assign({}, copy);

        result.push(b);
        break;

      case ('clear'):
        for (const key in copy) {
          delete copy[key];
        }

        const c = Object.assign({}, copy);

        result.push(c);
        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
