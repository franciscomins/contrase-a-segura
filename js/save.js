import {savePassword, getPass} from './firebase.js'

const passForm = document.getElementById('pass-form');

window.addEventListener('DOMContentLoaded', async() =>{
   const querySnapshot= await  getPass()

   querySnapshot.forEach(doc=>{
    console.log.apply(doc)
   });

})


passForm.addEventListener('submit', e => {
    e.preventDefault();

    const site = passForm['pass-site']
    const username = passForm['pass-username']
    const password = passForm['pass-password']

    //console.log(site.value, username.value, password.value)
    savePassword(site.value, username.value, password.value)

    passForm.reset()
})