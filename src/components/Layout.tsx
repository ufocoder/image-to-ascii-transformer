import { JSX } from "solid-js/jsx-runtime"

interface LayoutProps {
    children?: JSX.Element
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="sm:m-8 m-4">
      <h1 class="text-center text-5xl font-bold mb-2">
        Image to ASCII
      </h1>
      <p class="text-lg text-center mb-4">
        The tool allows you to convert images to ASCII, including animated
      </p>
      <div>
        {props.children}
      </div>
    </div>
  );
}
