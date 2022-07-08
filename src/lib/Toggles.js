const toggleMap = new Map();
toggleMap.set('graphDisplay', false);


export default class Toggles {
    static enabled(toggle) {
        return toggleMap.get(toggle);
    }
}