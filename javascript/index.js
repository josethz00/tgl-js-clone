window.onload = () => {

    const betGrid = document.querySelector('[data-js=bet-grid]');
    const betNumbers = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const betNumbersElements = [];

    function createCssStyleTag () {

        const newStyle = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(newStyle);
        return newStyle;

    }

    const styleTag = createCssStyleTag ();

    function populateBetGrid () {

        for (let i = 0; i <= betNumbers.length; i++) {

            styleTag.innerHTML = `.${betNumbers[i]} { grid-area: ${betNumbers[i]}; }`;
            const newElement = document.createElement('div');
            newElement.className = betNumbers[i];
            betNumbersElements.push(newElement);

        }

        return;

    }

    populateBetGrid ();

}