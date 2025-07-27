const apiTrailRemover = (base, url) =>
    `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

export default apiTrailRemover;