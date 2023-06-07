console.log('Child Created', process.pid);

process.on('message', (message) => {
    console.log(message);
    const result = is_prime(message);
    //throw new Error('This is a error in the child process')
    process.send(result);
    setTimeout(() => {
        process.exit
    }, 5000);
});

function is_prime(number) {
    const factors = [];
    if (number < 1) return false;
    if (number == 1) return true;
    for (let i = 2; i < number; i++) {
        if (number % i === 0) factors.push(i);
    }
    return { number, factors, isPrime: (factors.length > 0 ? false : true) }
};