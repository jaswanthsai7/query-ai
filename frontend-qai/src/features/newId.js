const newId = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID) ?
    crypto.randomUUID() :
    Math.random().toString(36).slice(2) + Date.now().toString(36);

export default newId;