'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const arrState = [];

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        const newState = Object.assign(cloneState, el.extraData);

        arrState.push(Object.assign({}, newState));
        continue;
      case 'removeProperties':
        for (const key of el.keysToRemove) {
          delete cloneState[key];
        }
        arrState.push(Object.assign({}, cloneState));
        continue;
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        arrState.push({});
        continue;
    }
  }

  return arrState;
}

module.exports = transformStateWithClones;
