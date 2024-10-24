'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let transState = { ...state };
  const cloneState = [];

  for (const i in actions) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'addProperties') {
      for (const key in extraData) {
        transState = Object.assign(transState, { [key]: extraData[key] });
      }
      cloneState.push(Object.assign({}, transState));
    }

    if (type === 'removeProperties') {
      for (const key in keysToRemove) {
        // transState = Object.assign(state, { [key]: keysToRemove[key] });
        delete transState[keysToRemove[key]];
      }
      cloneState.push(Object.assign({}, transState));
    }

    if (type === 'clear') {
      for (const key in transState) {
        delete transState[key];
      }
      cloneState.push(Object.assign({}, transState));
    }
  }

  return cloneState;
}

module.exports = transformStateWithClones;
