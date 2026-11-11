import SystemUtils, {
  CHAT_THEME_CUSTOM_DEFAULTS,
} from "../utils/cpr-systemUtils.js";

const COLOR_FIELDS = [
  "background",
  "headerBackground",
  "panelBackground",
  "panelInnerBackground",
  "textPrimary",
  "textSecondary",
  "textMuted",
  "border",
  "accent",
  "accentAlt",
  "success",
  "failure",
  "buttonBackground",
  "buttonHover",
  "buttonText",
  "gradientColor",
];

const FONT_FIELDS = {
  bodyFont: {
    jost: "CPR.settings.chatTheme.font.jost",
    ndMono: "CPR.settings.chatTheme.font.ndMono",
    system: "CPR.settings.chatTheme.font.system",
  },
  headingFont: {
    rubik: "CPR.settings.chatTheme.font.rubik",
    ndOswald: "CPR.settings.chatTheme.font.ndOswald",
    system: "CPR.settings.chatTheme.font.system",
  },
  monoFont: {
    ndMono: "CPR.settings.chatTheme.font.ndMono",
    systemMono: "CPR.settings.chatTheme.font.systemMono",
  },
};

const BACKGROUND_MODES = {
  solid: "CPR.settings.chatTheme.backgroundMode.solid",
  gradient: "CPR.settings.chatTheme.backgroundMode.gradient",
};

const GRADIENT_DIRECTIONS = {
  "0deg": "CPR.settings.chatTheme.gradientDirection.north",
  "45deg": "CPR.settings.chatTheme.gradientDirection.northEast",
  "90deg": "CPR.settings.chatTheme.gradientDirection.east",
  "135deg": "CPR.settings.chatTheme.gradientDirection.southEast",
  "180deg": "CPR.settings.chatTheme.gradientDirection.south",
  "225deg": "CPR.settings.chatTheme.gradientDirection.southWest",
  "270deg": "CPR.settings.chatTheme.gradientDirection.west",
  "315deg": "CPR.settings.chatTheme.gradientDirection.northWest",
};

export default class CPRChatThemeSettings extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: SystemUtils.Localize("CPR.settings.chatTheme.customSettings.title"),
      id: "cpr-chat-theme-settings",
      template: `systems/${game.system.id}/templates/apps/cpr-chat-theme-settings.hbs`,
      width: 520,
      height: "auto",
      closeOnSubmit: true,
    });
  }

  async getData() {
    const settings = foundry.utils.mergeObject(
      CHAT_THEME_CUSTOM_DEFAULTS,
      game.settings.get(game.system.id, "chatThemeCustom"),
      { inplace: false }
    );
    const colors = COLOR_FIELDS.map((key) => ({
      key,
      value: settings[key],
      label: `CPR.settings.chatTheme.color.${key}`,
    }));

    return {
      colors,
      bodyFontChoices: FONT_FIELDS.bodyFont,
      bodyFont: settings.bodyFont,
      headingFontChoices: FONT_FIELDS.headingFont,
      headingFont: settings.headingFont,
      monoFontChoices: FONT_FIELDS.monoFont,
      monoFont: settings.monoFont,
      backgroundModeChoices: BACKGROUND_MODES,
      backgroundMode: settings.backgroundMode,
      backgroundOpacity: settings.backgroundOpacity,
      gradientDirectionChoices: GRADIENT_DIRECTIONS,
      gradientDirection: settings.gradientDirection,
    };
  }

  async _updateObject(event, formData) {
    const customTheme = {};
    for (const key of COLOR_FIELDS) {
      const value = formData[key];
      if (typeof value !== "string" || !/^#[\da-f]{6}$/i.test(value)) {
        throw new Error(`Invalid custom chat theme color for "${key}": ${value}`);
      }
      customTheme[key] = value;
    }

    if (!Object.hasOwn(BACKGROUND_MODES, formData.backgroundMode)) {
      throw new Error(`Invalid custom chat theme background mode: ${formData.backgroundMode}`);
    }
    customTheme.backgroundMode = formData.backgroundMode;

    const backgroundOpacity = Number(formData.backgroundOpacity);
    if (
      !Number.isInteger(backgroundOpacity) ||
      backgroundOpacity < 0 ||
      backgroundOpacity > 100
    ) {
      throw new Error(`Invalid custom chat theme background opacity: ${formData.backgroundOpacity}`);
    }
    customTheme.backgroundOpacity = backgroundOpacity;

    if (!Object.hasOwn(GRADIENT_DIRECTIONS, formData.gradientDirection)) {
      throw new Error(`Invalid custom chat theme gradient direction: ${formData.gradientDirection}`);
    }
    customTheme.gradientDirection = formData.gradientDirection;

    for (const [key, choices] of Object.entries(FONT_FIELDS)) {
      if (!Object.hasOwn(choices, formData[key])) {
        throw new Error(`Invalid custom chat theme font for "${key}": ${formData[key]}`);
      }
      customTheme[key] = formData[key];
    }

    await game.settings.set(game.system.id, "chatThemeCustom", customTheme);
    SystemUtils.DisplayMessage(
      "notify",
      SystemUtils.Localize("CPR.settings.chatTheme.customSettings.saved")
    );
  }
}
