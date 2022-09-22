'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformArr = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        transformArr.push(Object.assign({}, copyState));
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete copyState[key];
        }
        transformArr.push(Object.assign({}, copyState));
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        transformArr.push({});
        break;
    }
  }

  return transformArr;
}

module.exports = transformStateWithClones;
