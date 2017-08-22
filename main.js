document.addEventListener('DOMContentLoaded', function () {
    var find = document.querySelector.bind(document)
    // Init start screen
    var startScreen = find('#start')
    var primesButton = find('#gamemode-primes')


    var game = {
        primes: {
            question: undefined,
            recent: [],
            streak: 0,
            correct: 0,
            totalQuestions: 0,
            min: 2,
            max: 197    // IDEA: Change this for new difficulties
        }
    }

    primesButton.addEventListener('click', function () {
        hide(startScreen)
        show(primesContainer)
        primeOrNot()
    })

    // Init primes
    var primesContainer = find('#primes-container')
    var primeQuestion = find('#primes-container .question')
    var primeResult = find('#primes-container .result')
    var primeResultText = find('#primes-container .result span')
    var primeResultFooter = find('#primes-container .result-footer')
    var primeFactors = find('#prime-factors')
    var solutionStreak = find('#streak > span > span')
    var solutionPercentage = find('#percentage > span > span')
    var primeYes = find('#prime-yes')
    var primeNo = find('#prime-no')
    var primeNext = find('#prime-next')
    var checkIcon = find('#check')
    var infoIcon = find('#info')
    primeYes.addEventListener('click', answer.bind(null, true))
    primeNo.addEventListener('click', answer.bind(null, false))
    primeNext.addEventListener('click', primeOrNot)

    function primeOrNot () {
        hide(primeResultFooter)
        hide(primeResult)
        show(primeNo.parentElement)
        hide(infoIcon)
        hide(checkIcon)

        game.primes.totalQuestions++

        game.primes.question = randomInt(game.primes.min, game.primes.max)
        // Avoid the same number from coming too often.
        while (game.primes.recent.indexOf(game.primes.question) > -1) {
            game.primes.question = randomInt(game.primes.min, game.primes.max)
        }
        // Keep the recent numbers.
        game.primes.recent = game.primes.recent.slice(Math.max(game.primes.recent.length - 9, 1)).concat(game.primes.question)
        primeQuestion.innerText = game.primes.question
    }

    function answer (guess) {
        // Reser previous results
        primeResult.classList.remove('correct', 'wrong')
        if (game.primes.totalQuestions === 1) {
            // This is used when displaying tooltips.
            find('.stats.wide').classList.remove('wide')
        }
        primeResultText.innerText = ''
        primeFactors.innerText = ''

        var correctGuess = guess === isPrime(game.primes.question)
        if (correctGuess) {
            primeResult.classList.add('correct')
            primeResultText.innerText += 'Correct! '
            show(checkIcon)
            game.primes.correct++
            game.primes.streak++
        } else {
            primeResult.classList.add('wrong')
            show(infoIcon)
            game.primes.streak = 0
        }

        if (isPrime(game.primes.question)) {
            primeResultText.innerText += game.primes.question + ' is a prime number.'
        } else {
            primeResultText.innerText += game.primes.question + ' is NOT a prime number.'
            primeFactors.innerText = 'Prime factors: ' + getPrimeFactors(game.primes.question).join(', ')
        }
        solutionPercentage.innerText = (game.primes.correct / game.primes.totalQuestions).toLocaleString('en', { style: 'percent' })
        solutionStreak.innerText = game.primes.streak

        hide(primeNo.parentElement)
        show(primeResultFooter)
        show(primeResult)
    }
})

function getRandomOddInt (min, max) {
    var n = randomInt(min, max)
    while (n % 2 === 0 || n % 5 === 0) {
        n = randomInt(min, max)
    }
    return n
}

function randomInt (min, max) {
    return Math.floor((Math.random() * max) + min)
}

function isPrime (n) {
    return window.primesBelow1000.indexOf(n) > -1
}

function getPrimeFactors (remainder) {
    var factors = []

    for (var i = 2; i <= remainder; i++) {
        while ((remainder % i) === 0) {
            factors.push(i)
            remainder /= i
        }
    }

    return factors
}

function hide (element) {
    element.classList.add('hidden')
}

function show (element) {
    element.classList.remove('hidden')
}

window.primesBelow1000 = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
    239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
    331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
    421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
    613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
    709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
    821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
    919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
]
