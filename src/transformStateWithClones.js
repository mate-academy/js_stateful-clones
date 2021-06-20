'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const values = Object.values(actions[i]);

    for (let j = 0; j < values.length; j++) {
      if (values[j] === 'addProperties') {
        Object.assign(copyState, values[j + 1]);
      }
    }

    for (let j = 0; j < values.length; j++) {
      if (values[j] === 'clear') {
        for (const key in copyState) {
          delete copyState[key];
        }
      }
    }

    for (let j = 0; j < values.length; j++) {
      if (values[j] === 'removeProperties') {
        for (const key of values[j + 1]) {
          delete copyState[key];
        }
      }
    }

    let objNumber = i;

    objNumber = { ...copyState };
    array.push(objNumber);
  }

  return array;
}

module.exports = transformStateWithClones;
