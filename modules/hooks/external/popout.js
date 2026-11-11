import SystemUtils from "../../utils/cpr-systemUtils.js";

const InitializePopOutIntegration = () => {
  /**
   * Set the CPR chat card color scheme in PopOut! Module
   * https://foundryvtt.com/packages/popout/
   *
   * @public
   * @memberof hookEvents
   */
  Hooks.on("PopOut:loaded", async (_, node) => {
    SystemUtils.SetChatTheme(node);
  });
};

export default InitializePopOutIntegration;
