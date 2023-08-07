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

  for (const obj of actions) {
    const { type } = obj;

    switch (type) {
      case TYPE_ONE:
        Object.assign(stateClone, obj.extraData);

        const addObj = { ...stateClone };

        resultArr.push(addObj);
        break;

      case TYPE_TWO:
        for (const key of obj.keysToRemove) {
          delete stateClone[key];
        }

        const removeObj = { ...stateClone };

        resultArr.push(removeObj);
        break;

      case TYPE_THREE:
        for (const prop in stateClone) {
          delete stateClone[prop];
        }

        const clearObj = { ...stateClone };

        resultArr.push(clearObj);
        break;

      default:
        return state;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
