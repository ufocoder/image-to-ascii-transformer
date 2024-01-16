interface SettingBaseDescriptor {
  title: string;
  name: keyof Settings;
  when?: (target: Target, settings: Settings) => boolean
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
  {
    name: "textSize",
    type: "number",
    title: "Text font size",
  },
  {
    name: "colored",
    type: "boolean",
    title: "Colored",
    when: (target) => target === "canvas",
  },
  {
    name: "textColor",
    type: "color",
    title: "Text color",
    when: (target, settings) => target === "canvas" && !settings.colored,
  },
  {
    name: "backgroundColor",
    type: "color",
    title: "Background color",
    when: (target, settings) => target === "canvas" && !settings.colored,
  }
];
