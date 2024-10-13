let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
        resolve('Success');
    } else {
        reject("Failed")
        
    }
})

p.then((message) => {
    console.log(message);
}).catch((message) => {
    console.log(message);
})

// the promises are very similar to callbacks but a cleaner way
