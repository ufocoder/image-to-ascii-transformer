const extractMimeType = (header: string) => {
    switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return "unknown";
    }
}

export const getMimeType = async (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    
    fileReader.onloadend = () => {
        const bytes = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        const header = bytes.reduce((accumulator, byte) => accumulator += byte.toString(16), '');

        resolve(extractMimeType(header));
    };

    fileReader.onerror = reject;
    fileReader.onabort = reject;
    fileReader.readAsArrayBuffer(blob);
});