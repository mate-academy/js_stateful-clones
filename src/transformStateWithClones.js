'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const TYPE_ONE = 'addProperties';
  const TYPE_TWO = 'removeProperties';
  const TYPE_THREE = 'clear';
  const stateClone = { ...state };
  const resultArr = [];
  let addObj = {};

  for (const obj of actions) {
    const { type } = obj;

    switch (type) {
      case TYPE_ONE:
        Object.assign(stateClone, obj.extraData);

        addObj = { ...stateClone };

        break;

      case TYPE_TWO:
        for (const key of obj.keysToRemove) {
          delete stateClone[key];
        }

        addObj = { ...stateClone };

        break;

      case TYPE_THREE:
        for (const prop in stateClone) {
          delete stateClone[prop];
        }

        addObj = { ...stateClone };

        break;

      default:
        return state;
    }

    resultArr.push(addObj);
  }

  return resultArr;
}

module.exports = transformStateWithClones;
