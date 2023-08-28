import { JSX } from "solid-js/jsx-runtime"

interface LayoutProps {
    children?: JSX.Element
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="m-6 p-1">
      <h1 class="u-text u-text-1">Image to ASC-II transformer</h1>
      <p>Small description of this project will be here but not now</p>
      <div class="Layout mt-6">
        {props.children}
      </div>
    </div>
  );
}
