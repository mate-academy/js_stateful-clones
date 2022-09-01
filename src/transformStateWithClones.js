'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = {};

  Object.assign(stateClone, state);

  for (const operation of actions) {
    const operationType = operation.type;

    switch (operationType) {
      case 'addProperties':
        Object.assign(stateClone, operation.extraData);
        break;
      case 'removeProperties':
        for (const key of operation.keysToRemove) {
          delete stateClone[key];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
    }

    result.push(Object.assign({}, stateClone));
  }

  return result;
}

module.exports = transformStateWithClones;
