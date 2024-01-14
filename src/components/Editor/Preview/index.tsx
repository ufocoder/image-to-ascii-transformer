import { Accessor } from "solid-js";
import Container from "@app/components/Editor/Container";

interface PreviewProps {
    imageContainer: Accessor<ImageContainer | undefined>;
    resetContainer: () => void;
}
  
export default function Preview(props: PreviewProps) {
    return (
        <>
            <Container>
                <img 
                    src={props.imageContainer()?.element.src} 
                    height={props.imageContainer()?.element.height}
                    width={props.imageContainer()?.element.width}
                />
            </Container>
            <p class="text-center">
                orinal size is {props.imageContainer()?.element.width}x{props.imageContainer()?.element.height},
                mime-type {props.imageContainer()?.mime}
            </p>
            <button 
                type="button"
                class="mx-auto px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => props.resetContainer()}
            >
                Reset 
            </button>
        </>
    )
}