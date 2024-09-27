'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const allProps = [];
  const stateClone = Object.assign({}, state);
  for (const i of transforms) {
    const { operation, properties } = i;
    switch (operation) {
      case 'addProperties':
        for (const k in properties) {
          stateClone[k] = properties[k];
        }
        break;
      case 'removeProperties':
        for (const j of properties) {
          delete stateClone[j];
        }
        break;
      case 'clear':
        for (const clear in stateClone) {
          delete stateClone[clear];
        }
        break;
    }
    allProps.push(Object.assign({}, stateClone));
  }
  return allProps;
}

module.exports = transformStateWithClones;
