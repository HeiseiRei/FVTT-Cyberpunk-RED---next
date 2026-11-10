import CPRCharacterActorSheetND from "./cpr-character-sheet-nd.js";

export default class CPRCharacterActorSheetND2077 extends CPRCharacterActorSheetND {
  static DEFAULT_OPTIONS = {
    ...CPRCharacterActorSheetND.DEFAULT_OPTIONS,
    classes: [...CPRCharacterActorSheetND.DEFAULT_OPTIONS.classes, "cpr-sheet-nd-2077"],
  };
}
