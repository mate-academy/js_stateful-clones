'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const COMP_ARR = [];
  const COMP_OBJ = { ...state };
  const RES = [];

  RES.push(state);

  for (let i = 0; i < actions.length; i++) {
    const OBJ_OF_ACTIONS = actions[i];
    const OBJ_FOR_WORK_KEY = OBJ_OF_ACTIONS.type;
    const OBJ_FOR_WORK_VALUE = OBJ_OF_ACTIONS.extraData
    || OBJ_OF_ACTIONS.keysToRemove;
    const OBJ_FOR_WORK = {};

    OBJ_FOR_WORK[OBJ_FOR_WORK_KEY] = OBJ_FOR_WORK_VALUE;
    COMP_ARR.push(OBJ_FOR_WORK);
  }

  for (let i = 0; i < COMP_ARR.length; i++) {
    const el = COMP_ARR[i];

    if (el.hasOwnProperty('clear')) {
      for (const key in COMP_OBJ) {
        delete COMP_OBJ[key];
      }
      RES.push(COMP_OBJ);
    }

    if (el.hasOwnProperty('addProperties')) {
      const OBJ_FOR_WORK = { ...RES[RES.length - 1] };

      Object.assign(OBJ_FOR_WORK, el.addProperties);
      RES.push(OBJ_FOR_WORK);
    }

    if (el.hasOwnProperty('removeProperties')) {
      const OBJ_FOR_WORK = { ...RES[RES.length - 1] };
      const KEYS_TO_DELETE = el.removeProperties;

      for (const ITEM_DEL of KEYS_TO_DELETE) {
        for (const key in OBJ_FOR_WORK) {
          if (ITEM_DEL === key) {
            delete OBJ_FOR_WORK[ITEM_DEL];
          }
        }
      }

      RES.push(OBJ_FOR_WORK);
    }
  }

  RES.splice(0, 1);

  for (let i = 0; i < RES.length; i++) {
    let el = RES[i];

    for (const key in state) {
      delete state[key];
    }

    el = Object.assign(state, el);
  }

  return RES;
}

module.exports = transformStateWithClones;
