'use strict';

const ACTIONS = {
  CLEAR: 'clear',
  ADD_PROP: 'addProperties',
  REMOVE_PROP: 'removeProperties',
};

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  return actions.reduce((resultArr, currentAction) => {
    const prevStateObject = resultArr[resultArr.length - 1];
    const currentStateObject = prevStateObject
      ? { ...prevStateObject }
      : { ...state };

    switch (currentAction.type) {
      case ACTIONS.CLEAR:
        return [...resultArr, {}];
      case ACTIONS.ADD_PROP:
        const extraData = currentAction.extraData;

        for (const key in extraData) {
          currentStateObject[key] = extraData[key];
        }

        return [...resultArr, currentStateObject];
      case ACTIONS.REMOVE_PROP:
        currentAction?.keysToRemove.forEach((key) => {
          delete currentStateObject[key];
        });

        return [...resultArr, currentStateObject];
      default:
        return resultArr;
    }
  }, []);
}

module.exports = transformStateWithClones;
