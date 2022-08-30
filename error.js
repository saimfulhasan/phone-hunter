fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

// async
try{
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
}
catch{

}

// document.getElementById('abc');

// synchronous asynchronous
console.log(1);
setTimeout(() => {
    console.log(2);
}, 3000); /* এখানে 2 ৩০০০ মিলিসেকেন্ড বা ৩ সেকেন্ড পরে লোড হবে। তাই output এ 2 
সবার শেষে আসবে। */
console.log(3);
console.log(15);
console.log(15);
console.log(15);