import {savePassword} from './firebase.js'

const passForm = document.getElementById('pass-form');


passForm.addEventListener('submit', e => {
    e.preventDefault();

    const site = passForm['pass-site']
    const username = passForm['pass-username']
    const password = passForm['pass-password']

    //console.log(site.value, username.value, password.value)
    savePassword(site.value, username.value, password.value)
})