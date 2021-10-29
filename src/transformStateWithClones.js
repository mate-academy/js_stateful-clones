'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyOfState = Object.assign({}, state);
  const result = [];

  for (const run of transforms) {
    const { operation, properties } = run;

    switch (operation) {
      case 'addProperties':
        Object.assign(copyOfState, properties);
        break;

      case 'removeProperties':
        for (const remove of properties) {
          delete copyOfState[remove];
        }
        break;

      case 'clear':
        copyOfState = {};
        break;
    }

    result.push(Object.assign({}, copyOfState));
  }

  return result;
}

module.exports = transformStateWithClones;
