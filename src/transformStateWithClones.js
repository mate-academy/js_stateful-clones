'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const produced = [];
  const transformations = Object.assign({}, state);

  for (const i of transforms) {
    switch (i['operation']) {
      case 'addProperties':
        for (const keys in i['properties']) {
          transformations[keys] = i['properties'][keys];
        }
        break;
      case 'removeProperties':
        for (const r of i['properties']) {
          delete transformations[r];
        }
        break;
      case 'clear':
        for (const c in transformations) {
          delete transformations[c];
        }
        break;
    }
    produced.push(Object.assign({}, transformations));
  }

  return produced;
}

module.exports = transformStateWithClones;
