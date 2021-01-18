function getLocalStorageKey (key) {

    const recoveredKey = localStorage.getItem(key);

    if (recoveredKey)
        return JSON.parse(recoveredKey);

    return [];

}

export { getLocalStorageKey };