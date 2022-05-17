'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copy = { ...state };

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'clear') {
        for (const keyState in copy) {
          delete copy[keyState];
        }

        const innerCopy = { ...copy };

        res.push(innerCopy);
      }

      if (action[key] === 'removeProperties') {
        const values = [];

        for (const keyAct in action) {
          values.push(action[keyAct]);
        }

        for (let j = 0; j < values[1].length; j++) {
          for (const keyState in copy) {
            if (keyState === values[1][j]) {
              delete copy[keyState];
            }
          }
        }

        const innerCopy = { ...copy };

        res.push(innerCopy);
      }

      if (action[key] === 'addProperties') {
        const values = [];

        for (const keyAct in action) {
          values.push(action[keyAct]);
        }

        for (const addKey in values[1]) {
          copy[addKey] = values[1][addKey];
        }

        const innerCopy = { ...copy };

        res.push(innerCopy);
      }
    }
  }

  return res;
}

module.exports = transformStateWithClones;
