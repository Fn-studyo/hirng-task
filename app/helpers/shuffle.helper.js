module.exports.shuffle = function shuffle(s) {
    let arr = s.split('');           // Convert String to array
    let n = arr.length;              // Length of the array

    for(let i=0 ; i<n-1 ; ++i) {
        let j = getRandomInt(n);       // Get random of [0, n-1]

        let temp = arr[i];             // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}