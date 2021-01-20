function normalizeString (value) {

    const normalizedString = value.normalize('NFD').replace(/[\u0300-\u036f\-_]/g, '');
    return normalizedString.toLowerCase();

}

export { normalizeString };