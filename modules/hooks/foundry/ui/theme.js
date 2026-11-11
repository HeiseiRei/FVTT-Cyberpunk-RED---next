import SystemUtils from "../../../utils/cpr-systemUtils.js";

const SetChatTheme = () => {
  /**
   * Set the CPR chat card color scheme after user settings have been loaded.
   *
   * @public
   * @memberof hookEvents
   */
  Hooks.once("ready", () => {
    SystemUtils.SetChatTheme();
  });
};

export default SetChatTheme;
