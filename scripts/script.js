

// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
document.addEventListener('DOMContentLoaded', () => {
  let count = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = count;
        newPost.addEventListener('click', () => {
          setState({name: 'single-entry', id: newPost.id});
        })
        count += 1;
        document.querySelector('main').appendChild(newPost);
      });
    });
});


document.querySelector('header h1').addEventListener('click', () => {
  setState({name: 'home'}, false);
});

document.querySelector('header img').addEventListener('click', () => {
  setState({name: 'settings'}, false);
});

window.onpopstate = function(event) {
  setState(event.state, true);
}

