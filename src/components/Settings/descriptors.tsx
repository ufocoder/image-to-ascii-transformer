export type SettingType = 'color' | 'text' | 'boolean' | 'number';

export type SettingDescriptor = {
    name: keyof Settings;
    type: SettingType;
    title: string;
}

export const settingsDescriptors: SettingDescriptor[] = [
    {
        name: 'colored',
        type: 'boolean',
        title: 'Colored',
    },
    {
        name: 'backgroundColor',
        type: 'color',
        title: 'Background color',
    },
    {
        name: 'textColor',
        type: 'color',
        title: 'Text color',
    },
    {
        name: 'textSize',
        type: 'number',
        title: 'Text font size',
    },
]