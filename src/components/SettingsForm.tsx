import { Accessor, Setter } from "solid-js";
import { defaultSettings } from "../constants";

interface CanvasProps {
    settings: Accessor<Settings>;
    onChange: Setter<Settings>;
}

// @NOTICE: check JSX.EventHandler<HTMLInputElement, InputEvent>
type HandlerCreator = <T extends Event>(fieldName: keyof Settings) => (e: T) => void;

export default function SettingsForm({ settings, onChange }: CanvasProps) {
    const createHandler: HandlerCreator = (fieldName) => (e) =>
        onChange(prevSettings => ({
            ...prevSettings,
            [fieldName]: (e.target as HTMLInputElement).value // @TODO: improve typings
        }));

    const handleResetButtonClick = () => {
        onChange(defaultSettings);
    }

    return (
        <form>
            <div class="form-group">
                <label for="settings-backgroundColor">background color</label>
                <input id="settings-backgroundColor" type="color" onInput={createHandler('backgroundColor')} onChange={createHandler('backgroundColor')} value={settings.backgroundColor} />
            </div>

            <div class="form-group">
                <label for="settings-textColor">text color</label>
                <input id="settings-textColor" type="color" onInput={createHandler('textColor')} onChange={createHandler('textColor')} value={settings.textColor} />
            </div>

            <div class="form-group">
                <label for="settings-textSize">text size</label>
                <input id="settings-textSize" class="form-control" type="number" onChange={createHandler('textSize')} value={settings.textSize} />
            </div>

            <button class="btn" type="button" onClick={handleResetButtonClick}>Reset</button>
        </form>
    );
}
