interface SettingBaseDescriptor {
  title: string;
  name: keyof Settings;
}

export interface SettingSingleDescriptor extends SettingBaseDescriptor {
  type: "color" | "text" | "boolean" | "number";
}

interface SelectOption {
  title: string;
  value: Scale;
}

export interface SettingMultipleDescriptor extends SettingBaseDescriptor {
  type: "select";
  options: SelectOption[];
}

type SettingDescriptor = SettingSingleDescriptor | SettingMultipleDescriptor

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
