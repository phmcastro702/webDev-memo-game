var cardsArray = [
    {'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
    {'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
    {'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
    {'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
    {'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
    {'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
    {'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
    {'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
    {'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
    {'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
    {'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
    {'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
    
];

// duplicating the cardsArray using the spread operator
let gameGrid = [...cardsArray, ...cardsArray];
gameGrid.sort(() => {
    return 0.5 - Math.random();
});

let game = document.getElementById('game-board');

let grid = document.createElement('section');

grid.setAttribute('class', 'grid');

game.appendChild(grid);

for(let card of gameGrid)
{
    let tempCard = document.createElement('div');
    tempCard.classList.add('card');
    tempCard.dataset.name = card.name;
    var front = document.createElement('div');
    front.classList.add('front');
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${card.img})`;

    grid.appendChild(tempCard);
    tempCard.appendChild(front);
    tempCard.appendChild(back);
}

var match = () => {

    [...document.querySelectorAll('.selected')].map((item) => item.classList.add('match'));

};

var resetGuesses = () => {
    guesses[0] = '';
    guesses[1] = '';
    selectedCount = 0;
    previousTarget = null;

    [...document.querySelectorAll('.selected')].map((item) => item.classList.remove('selected'));
};


let guesses = ['', ''];
let selectedCount = 0;
let previousTarget = null;
let delay = 1200;

grid.addEventListener('click', (e) => {

    let cardClicked = e.target;

    if(cardClicked.nodeName === 'SECTION' || cardClicked === previousTarget || cardClicked.parentNode.classList.contains('match') || cardClicked.parentNode.classList.contains('selected')) 
    { return; }

    if (selectedCount < 2)
    {
        selectedCount++;

        if(selectedCount === 1)
        {
            guesses[0] = cardClicked.parentNode.dataset.name;
            cardClicked.parentNode.classList.add('selected');
        }
        else
        {
            guesses[1] = cardClicked.parentNode.dataset.name;
            cardClicked.parentNode.classList.add('selected');
        }

        if(guesses[0] !== '' && guesses[1] !== '')
        {
            if(guesses[0] === guesses[1])
            {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }
            else 
            { 
                setTimeout(resetGuesses, delay);
                return;
            }
        }

    }
    
    previousTarget = cardClicked;
});