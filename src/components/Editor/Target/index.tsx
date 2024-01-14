import { Accessor, Setter } from "solid-js";
import iconCanvas from './assets/canvas.svg'
import iconTextarea from './assets/textarea.svg'

interface TagetControlsProps {
  target: Accessor<Target>;
  onChange: Setter<Target>;
}

const baseClassNames = "inline-flex items-center px-3 py-1 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700";
const notSelectedClassNames = "bg-gray-200 text-gray-400  hover:bg-white hover:text-black"
const selectedClassNames = "bg-white text-black";

export default function Target(props: TagetControlsProps) {
  return (
    <div class="inline-flex items-center rounded-md" role="group">
      <button 
        type="button"
        class={`${baseClassNames} rounded-s-lg ${props.target() === 'canvas' ? selectedClassNames : notSelectedClassNames}`}
        onClick={() => props.onChange('canvas')}
      >
        <img src={iconCanvas} width="18" height="18" class="mr-1" />
        Canvas
      </button>
      <button 
        type="button"
        class={`${baseClassNames} rounded-e-lg ${props.target() === 'text' ? selectedClassNames : notSelectedClassNames}`}
        onClick={() => props.onChange('text')}
      >
        <img src={iconTextarea} width="18" height="18" class="mr-1" />
        Text
      </button>
    </div>
  );
}
