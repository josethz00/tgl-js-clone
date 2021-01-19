import { getRandomInteger } from '../utils/getRandomInteger.js';
import { isInArray } from '../utils/isInArray.js';
import { getLocalStorageKey } from '../utils/getLocalStorageKey.js';
import { convertToBRL } from '../utils/convertToBRL.js';

window.onload = function () {

    const betGrid = document.querySelector('[data-js=bet-grid]');
    const totalValueField = document.querySelector('[data-js=total-value');
    const betTypeField = document.querySelector('[data-js=bet-type');
    const betSelections = document.querySelector('.bet-selections');
    const betNumbers = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const betNumbersElements = [];
    let markedNumbers = [];
    let currentBetType = 'loto';
    let betValue = 2.5;
    const initialCartData = getLocalStorageKey('cart');

    totalValueField.innerText = calculateTotalValue(initialCartData);

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

    function populateCart (items) {

        const betTitle = {

            'loto': 'Lotofácil',
            'mega': 'Mega-Sena',
            'mania': 'Lotomania'

        };

        if (!Array.isArray(items) && !items.length) {

            const emptyCartAdvice = document.createElement('span');
            emptyCartAdvice.setAttribute('style', 'text-align: center; font-weiht: 500;');
            emptyCartAdvice.innerText = 'O seu carrinho está vazio...';
            betSelections.appendChild(emptyCartAdvice);

        }

        for (let index = 0; index < items.length; index++) {


            const betContentDiv = document.createElement('div');
            betContentDiv.className = 'bet-content';
            const trashIcon = document.createElement('i');
            trashIcon.setAttribute('style', 'color: #888888; cursor: pointer;');
            trashIcon.setAttribute('data-feather', 'trash-2')
            trashIcon.addEventListener('click', () => removeFromCart (betContentDiv));
            betContentDiv.appendChild(trashIcon);
            const separatorDiv = document.createElement('div');
            separatorDiv.className = `separator-${items[index].currentBetType}`;
            betContentDiv.appendChild(separatorDiv);
            const betInfoDiv = document.createElement('div');
            betInfoDiv.className = 'bet-info';
            const spanWithBetNumbers = document.createElement('span');
            spanWithBetNumbers.innerText = items[index].markedNumbers.join(', ');
            betInfoDiv.appendChild(spanWithBetNumbers);
            const betPriceDiv = document.createElement('div');
            const betTitleSpan = document.createElement('span');
            betTitleSpan.innerText = betTitle[items[index].currentBetType];
            const betPriceSpan = document.createElement('span');
            betPriceSpan.innerText = convertToBRL(items[index].betValue);
            betInfoDiv.appendChild(betPriceDiv);
            betPriceDiv.appendChild(betTitleSpan);
            betPriceDiv.appendChild(betPriceSpan);
            betContentDiv.appendChild(betInfoDiv);
            betSelections.appendChild(betContentDiv);

            feather.replace();

            betContentDiv.childNodes[0].addEventListener('click', () => removeFromCart (betContentDiv));

        }

        return;

    }

    populateCart(initialCartData);

    function updateCart (item) {

        const betTitle = {

            'loto': 'Lotofácil',
            'mega': 'Mega-Sena',
            'mania': 'Lotomania'

        };

        const betContentDiv = document.createElement('div');
        betContentDiv.className = 'bet-content';

        const trashIcon = document.createElement('i');
        trashIcon.setAttribute('style', 'color: #888888; cursor: pointer;');
        trashIcon.setAttribute('data-feather', 'trash-2');
        betContentDiv.appendChild(trashIcon);
        const separatorDiv = document.createElement('div');
        separatorDiv.className = `separator-${item.currentBetType}`;
        betContentDiv.appendChild(separatorDiv);
        const betInfoDiv = document.createElement('div');
        betInfoDiv.className = 'bet-info';
        const spanWithBetNumbers = document.createElement('span');
        spanWithBetNumbers.innerText = item.markedNumbers.join(', ');
        betInfoDiv.appendChild(spanWithBetNumbers);
        const betPriceDiv = document.createElement('div');
        const betTitleSpan = document.createElement('span');
        betTitleSpan.innerText = betTitle[item.currentBetType];
        const betPriceSpan = document.createElement('span');
        betPriceSpan.innerText = convertToBRL(item.betValue);
        betInfoDiv.appendChild(betPriceDiv);
        betPriceDiv.appendChild(betTitleSpan);
        betPriceDiv.appendChild(betPriceSpan);
        betContentDiv.appendChild(betInfoDiv);
        betSelections.appendChild(betContentDiv);

        feather.replace();

        betContentDiv.childNodes[0].addEventListener('click', () => removeFromCart (betContentDiv));

        return ;

    }

    function removeFromCart (element) {

        const recoveredCartItems = getLocalStorageKey('cart');
        recoveredCartItems.splice(Number(element.innerText - 1), 1);
        const updatedCart = recoveredCartItems;
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        return element.parentNode.removeChild(element);

    }
    
    function clearGame () {

        for (let index = 0; index < betNumbersElements.length; index++) {

            betNumbersElements[index].className = `bet-grid-${index+1}`;

        }

        markedNumbers.splice(0, markedNumbers.length);

        return;

    }

    function completeGame () {

        clearGame();
        const randomBets = [];

        while (randomBets.length < 15) {

            const randomNumber = getRandomInteger(0, 35)

            if (!isInArray(randomNumber, randomBets)) {
             
                randomBets.push(randomNumber);
                markedNumbers.push(betNumbersElements[randomNumber].innerText);
                betNumbersElements[randomNumber].className = `selected-${currentBetType}`;

            }

        }

        return;

    }

    function calculateTotalValue (items) {

        const totalValue =  items.reduce((accumulated, currentValue) => accumulated + currentValue.betValue, 0);
        const formattedTotalValue = convertToBRL(totalValue);
        totalValueField.innerText = formattedTotalValue;
        return formattedTotalValue;

    }

    function addToCart () {

        if (markedNumbers.length !== 15)
            return;

        const recoveredCartItems = getLocalStorageKey('cart');
        recoveredCartItems.push({
            betValue,
            currentBetType,
            markedNumbers
        });
        const updatedCart = recoveredCartItems;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotalValue(updatedCart);
        updateCart({
            betValue,
            currentBetType,
            markedNumbers
        });
        clearGame();

        return;

    }

    function betNumbersEvents () {

        for (let index = 0; index < betNumbersElements.length; index++) {

            betNumbersElements[index].addEventListener('click', () => {

                if (markedNumbers.find(number => number == betNumbersElements[index].innerText)) {

                    markedNumbers = markedNumbers.filter(number => number != betNumbersElements[index].innerText);
                    betNumbersElements[index].className = `bet-grid-${index+1}`;

                }

                else {

                    markedNumbers.push(betNumbersElements[index].innerText);
                    betNumbersElements[index].className = `selected-${currentBetType}`;

                }

            });

        }

        return;

    }

    function switchBetTypesEvents () {

        const lotoButton = document.querySelectorAll('button')[0],
        megaButton = document.querySelectorAll('button')[1],
        maniaButton = document.querySelectorAll('button')[2];

        lotoButton.setAttribute('style', 'background-color: #7F3992; color: #fff;');

        lotoButton.addEventListener('click', () => {
            
            if (currentBetType === 'loto')
                return;

            clearGame();
            lotoButton.setAttribute('style', 'background-color: #7F3992; color: #fff;');
            megaButton.setAttribute('style', '');
            maniaButton.setAttribute('style', '');
            currentBetType = 'loto';
            betValue = 2.5;
            betTypeField.innerText = 'FOR LOTOFÁCIL';
            
        });
        megaButton.addEventListener('click', () => {
            
            if (currentBetType === 'mega')
                return;

            clearGame();
            megaButton.setAttribute('style', 'background-color: #27C383; color: #fff;');
            lotoButton.setAttribute('style', '');
            maniaButton.setAttribute('style', '');
            currentBetType = 'mega';
            betValue = 4.5;
            betTypeField.innerText = 'FOR MEGA-SENA';
            
        });
        maniaButton.addEventListener('click', () => {
            
            if (currentBetType === 'mania')
                return;

            clearGame();
            maniaButton.setAttribute('style', 'background-color: #F79C31; color: #fff;');
            megaButton.setAttribute('style', '');
            lotoButton.setAttribute('style', '');
            currentBetType = 'mania';
            betValue = 2;
            betTypeField.innerText = 'FOR LOTOMANIA';
            
        });

        return;

    }

    function buttonsEvents () {

        const completeGameButton = document.querySelectorAll('button')[3],
        clearGameButton = document.querySelectorAll('button')[4],
        addToCartButton = document.querySelectorAll('button')[5];

        completeGameButton.addEventListener('click', completeGame);
        clearGameButton.addEventListener('click', clearGame);
        addToCartButton.addEventListener('click', addToCart);

        return;

    }

    function handleEventListeners () {

        betNumbersEvents();
        buttonsEvents();
        switchBetTypesEvents();
        return;

    }

    handleEventListeners ();

}