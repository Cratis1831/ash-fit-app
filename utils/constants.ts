export enum WeightUnits {
  KGS = "kg",
  LBS = "lbs",
}

export enum Colors {
  PRIMARY_BUTTON_TEXT = "#5680ff", // Hex for #ff5656
  DESTRUCTIVE_BUTTON_TEXT = "#FF0000", // Hex for red
  INPUT_BORDER_COLOR = "#CCCCCC", // Hex for light gray
  COLORED_BUTTON_TEXT = "#FFFFFF", // Hex for white
  COLORED_BUTTON_BACKGROUND = PRIMARY_BUTTON_TEXT, // Hex for red
  BACKGROUND_COLOR = "#FFFFFF", // Hex for white
  INACTIVE_TAB_ICON = "#adb5bd", // Hex for light gray
  ACTIVE_TAB_ICON = PRIMARY_BUTTON_TEXT, // Hex for blue
  DISABLED_BUTTON_TEXT = "#666666", // Hex for dark gray
  DISABLED_BUTTON_BACKGROUND = "#E0E0E0", // Hex for lighter gray
}

export const ColorScheme = {
  dark: {
    PRIMARY_BUTTON_TEXT: "#9aa0ff", // Lighter tint of blue
    DESTRUCTIVE_BUTTON_TEXT: "#ff6666", // Lighter tint of red
    INPUT_BORDER_COLOR: "#666666", // Darker gray
    COLORED_BUTTON_TEXT: "#000000", // Black
    COLORED_BUTTON_BACKGROUND: "#9aa0ff", // Lighter tint of blue
    BACKGROUND_COLOR: "#000000", // Black
    INACTIVE_TAB_ICON: "#666666", // Darker gray
    ACTIVE_TAB_ICON: "#9aa0ff", // Lighter tint of blue
  },
  light: {
    PRIMARY_BUTTON_TEXT: "#5b6cf9", // Hex for blue
    DESTRUCTIVE_BUTTON_TEXT: "#FF0000", // Hex for red
    INPUT_BORDER_COLOR: "#CCCCCC", // Hex for light gray
    COLORED_BUTTON_TEXT: "#FFFFFF", // Hex for white
    COLORED_BUTTON_BACKGROUND: "#5b6cf9", // Hex for blue
    BACKGROUND_COLOR: "#FFFFFF", // Hex for white
    INACTIVE_TAB_ICON: "#adb5bd", // Hex for light gray
    ACTIVE_TAB_ICON: "#5b6cf9", // Hex for blue
  },
};
