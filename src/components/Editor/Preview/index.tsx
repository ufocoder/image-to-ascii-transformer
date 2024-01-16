import { Accessor } from "solid-js";
import Container from "@app/components/Editor/Container";

interface PreviewProps {
    imageContainer: Accessor<ImageContainer | undefined>;
    resetContainer: () => void;
}
  
export default function Preview(props: PreviewProps) {
    return (
        <Container>
            <div>
                <h3 class="block text-center text-2xl mb-2">
                    Original image
                </h3>
                <img
                    class="mx-auto"
                    src={props.imageContainer()?.element.src} 
                    height={props.imageContainer()?.element.height}
                    width={props.imageContainer()?.element.width}
                />
            </div>
            <p class="text-center my-2">
                size is <span class="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5">{props.imageContainer()?.element.width}x{props.imageContainer()?.element.height}</span>{' '}pixels
            </p>
            <p class="text-center my-2">
                mime-type <span class="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5">{props.imageContainer()?.mime}</span>
            </p>
            <button 
                type="button"
                class="block my-2 mx-auto px-3 py-2 text-xs font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={() => props.resetContainer()}
            >
                Reset 
            </button>
        </Container>
    )
}