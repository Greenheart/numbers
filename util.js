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

function clearHash () {
    // Change URL without page reload.
    history.replaceState({}, document.title, location.href.substr(0, location.href.length - location.hash.length))
}
