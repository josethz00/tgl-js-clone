function isInArray (target, array) {

    for (let index = 0; index < array.length; index++) {
    
        if (array[index] === target)
            return true;
    
    }

    return false; 

}

export { isInArray };