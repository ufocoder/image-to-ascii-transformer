import { Accessor, Setter } from "solid-js";
import iconCanvas from './assets/canvas.svg'
import iconTextarea from './assets/textarea.svg'

interface TagetControlsProps {
  target: Accessor<Target>;
  onChange: Setter<Target>;
}

const baseClassNames = "inline-flex items-center px-3 py-1 text-sm font-medium border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
const notSelectedClassNames = "bg-gray-200 text-gray-400  hover:bg-white hover:text-black"
const selectedClassNames = "bg-white text-black";

export default function Target(props: TagetControlsProps) {
  return (
    <div class="inline-flex items-center rounded-md" role="group">
      <p class="inline mr-2">Target</p>
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
        class={`${baseClassNames} rounded-e-lg ${props.target() === 'textarea' ? selectedClassNames : notSelectedClassNames}`}
        onClick={() => props.onChange('textarea')}
      >
        <img src={iconTextarea} width="18" height="18" class="mr-1" />
        Textarea
      </button>
    </div>
  );
}
