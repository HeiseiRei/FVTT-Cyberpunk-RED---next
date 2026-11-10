import CPRItem from "../cpr-item.js";
import CPRActorUtils from "../../utils/ActorUtils.js";

/**
 * Extend the base CPRItem object with things specific to armor.
 * @extends {CPRItem}
 */
export default class CPRArmorItem extends CPRItem {
  /**
   * Return armor SP at a location, including upgrades and optional ablation.
   *
   * @param {string} location - armor location ("head" or "body")
   * @param {boolean} withAblation - include current ablation
   * @returns {Promise<number>}
   */
  getArmorSP(location, withAblation = false) {
    return CPRActorUtils.calculateArmorSP(this, location, withAblation);
  }
}
