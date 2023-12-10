export type SettingType = 'color' | 'text' | 'boolean' | 'number' | 'select';

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
    {
        name: 'scale',
        type: 'select',
        title: 'Scale mode',
/*
        options: [
            {
                title: '1 pixel to 1 letter', 
                value: 'fontsize'
            },
            {
                title: 'same image size', 
                value: 'imagesize'
            }
        ]
*/
    },
]
