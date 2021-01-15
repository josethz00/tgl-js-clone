window.onload = () => {

    const betGrid = document.querySelector('[data-js=bet-grid]');
    const betNumbers = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const betNumbersElements = [];
    let markedNumbers = [];

    function createCssStyleTag () {

        const newStyle = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(newStyle);
        return newStyle;

    }

    const styleTag = createCssStyleTag ();

    function populateBetGrid () {

        for (let index = 0; index < betNumbers.length; index++) {

            styleTag.appendChild(document.createTextNode(`.bet-grid-${betNumbers[index]} { width: 55px; height: 55px; border-radius: 50%; 
                background-color: #ADC0C4; display: flex; justify-content: center; align-items: center; 
                font-size: 20px; font-weight: 500; cursor: pointer; transition: .2s linear; }
                .bet-grid-${betNumbers[index]}:hover { background-color: #919a9b; }`));
            const newElement = document.createElement('div');
            newElement.className = `bet-grid-${betNumbers[index]}`;
            newElement.appendChild(document.createTextNode(betNumbers[index]));
            betNumbersElements.push(newElement);

        }

        for (let element in betNumbersElements) {

            betGrid.appendChild(betNumbersElements[element])

        }

        return;

    }

    populateBetGrid ();

    function betNumbersEvents () {

        for (let index = 0; index <= betNumbersElements.length; index++) {

            betNumbersElements[index].addEventListener('click', () => {

                if (markedNumbers.find(number => number == betNumbersElements[index].innerText)) {

                    markedNumbers = markedNumbers.filter(number => number != betNumbersElements[index].innerText);
                    betNumbersElements[index].className = `bet-grid-${index+1}`;

                }

                else {

                    markedNumbers.push(betNumbersElements[index].innerText);
                    betNumbersElements[index].className = 'selected';

                }

            });

        }

        return;

    }

    function handleEventListeners () {

        betNumbersEvents();

    }

    handleEventListeners ();

}