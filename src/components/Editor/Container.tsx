import { JSX } from "solid-js/jsx-runtime"

interface ContainerProps {
    children?: JSX.Element
}

export default function Container(props: ContainerProps) {
  return (
    <div class="flex flex-col items-center justify-center h-full border-black border-dashed rounded-lg bg-gray-50 p-8 mb-2 overflow-hidden">
        {props.children}
    </div>
  );
}
