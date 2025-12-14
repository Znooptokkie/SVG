import { DeconstructPath } from "./DeconstructPath.js";
import { CreateSides } from "./CreateSides.js";
export class InnerPath {
    // Maak nieuwe Offset PATH string van de gegeven PATH en padding
    // Zie het als een border om het gegeven PATH heen
    static buildOffsetPath(path, padding) {
        const eachSideObjects = CreateSides.getEachSide(path);
        const mutateOffsetPath = CreateSides.mutateOffsetPath(eachSideObjects, padding);
        const mergeArrayOfObjects = CreateSides.mergePathArray(mutateOffsetPath);
        const createStringPath = DeconstructPath.createNewSVGPathString(mergeArrayOfObjects);
        return createStringPath;
    }
}
