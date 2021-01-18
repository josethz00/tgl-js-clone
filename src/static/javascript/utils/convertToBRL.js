function convertToBRL (value) {

    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

}

export { convertToBRL };