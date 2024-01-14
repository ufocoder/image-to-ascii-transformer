interface SettingBaseDescriptor {
  title: string;
  name: keyof Settings;
  target?: Target[];
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

export type SettingDescriptor = SettingSingleDescriptor | SettingMultipleDescriptor;

export const settingsDescriptors: SettingDescriptor[] = [
  {
    name: "colored",
    type: "boolean",
    title: "Colored",
    target: ['canvas'],
  },
  {
    name: "invertColors",
    type: "boolean",
    title: "Invert Colors",
    target: ['canvas'],
  },
  {
    name: "backgroundColor",
    type: "color",
    title: "Background color",
    target: ['canvas'],
  },
  {
    name: "textColor",
    type: "color",
    title: "Text color",
    target: ['canvas', 'textarea'],
  },
  {
    name: "textSize",
    type: "number",
    title: "Text font size",
    target: ['canvas', 'textarea'],
  },
  {
    name: "scale",
    type: "select",
    title: "Scale mode",
    target: ['canvas', 'textarea'],
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
