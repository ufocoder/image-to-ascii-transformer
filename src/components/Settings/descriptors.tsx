export type SettingType = "color" | "text" | "boolean" | "number" | "select";

export interface SettingBaseDescriptor {
  name: keyof Settings;
  type: SettingType;
  title: string;
}

export interface SettingOptionsDescriptor extends SettingBaseDescriptor {
  type: "select";
  options: SelectOption[];
}

type SettingDescriptor = SettingBaseDescriptor | SettingOptionsDescriptor;

export const settingsDescriptors: SettingDescriptor[] = [
  {
    name: "colored",
    type: "boolean",
    title: "Colored",
  },
  {
    name: "backgroundColor",
    type: "color",
    title: "Background color",
  },
  {
    name: "textColor",
    type: "color",
    title: "Text color",
  },
  {
    name: "textSize",
    type: "number",
    title: "Text font size",
  },
  {
    name: "scale",
    type: "select",
    title: "Scale mode",
    options: [
      {
        title: "1 pixel to 1 letter",
        value: "pixel-to-letter",
      },
      {
        title: "same image size",
        value: "same-size",
      },
    ],
  },
];
