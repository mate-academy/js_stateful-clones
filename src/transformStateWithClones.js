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
    let currentStateObject = prevStateObject
      ? { ...prevStateObject }
      : { ...state };

    switch (currentAction.type) {
      case ACTIONS.CLEAR:
        currentStateObject = {};
        break;
      case ACTIONS.ADD_PROP:
        const extraData = currentAction.extraData;

        for (const key in extraData) {
          currentStateObject[key] = extraData[key];
        }
        break;
      case ACTIONS.REMOVE_PROP:
        currentAction?.keysToRemove.forEach((key) => {
          delete currentStateObject[key];
        });
        break;
      default:
        currentStateObject = {};
        break;
    }

    return [...resultArr, currentStateObject];
  }, []);
}

module.exports = transformStateWithClones;
