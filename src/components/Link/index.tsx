import { Accessor } from "solid-js";

interface LinkProps {
  link: Accessor<HTMLAnchorElement | undefined>;
}

export default function Link(props: LinkProps) {
  return <div>{props.link()}</div>;
}
