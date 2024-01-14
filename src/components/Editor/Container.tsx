import { JSX } from "solid-js/jsx-runtime"

interface ContainerProps {
    children?: JSX.Element
}

export default function Container(props: ContainerProps) {
  return (
    <div class="flex justify-center border-black border-dashed rounded-lg cursor-pointer bg-gray-50 p-8 mb-2 max-w-lg w-auto overflow-hidden lg:w-400">
        {props.children}
    </div>
  );
}
