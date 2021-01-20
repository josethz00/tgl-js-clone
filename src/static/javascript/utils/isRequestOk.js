function isRequestOk (request) {

    if (request.readyState === 4) {
        
        if (request.status === 201 || request.status === 200) {

            return true;

        }
        else {

            return false;

        }

    }

    return false;

}

export { isRequestOk };