import {
    savePassword,
    getPass,
    onGetPass,
    deletePass,
    editPass,
    updatePass,
} from './firebase.js'

const passForm = document.getElementById('pass-form')
const passContainer = document.getElementById('pass-container')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    passForm.reset();
    const querySnapshot = await getPass()

    onGetPass((querySnapshot) => {


        querySnapshot.forEach((doc) => {
            const pass = doc.data()
            passContainer.innerHTML += `
            
            <div class="container mb-5 mt-3">

                <h1 class="mt-3 h1"> ${pass.site}</h1>

                <p>Usuario: ${pass.username} </p>

                <p> Contraseña: <input id="passwordFieldId" type="password" readonly value="${pass.password}">   <button class="btn-show" data-id="${doc.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 19 20">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg>
                </button></p>

                <button class="btn btn-danger btn-delete btnList"  data-id="${doc.id}">Borrar</button>
                <button class="btn btn-primary btn-edit btnList" data-id="${doc.id}">Modificar</button>

             </div >
             <hr class="mt-5">
                 `;
            
        });
      

        const btnDelete = passContainer.querySelectorAll('.btn-delete')
        btnDelete.forEach(btn =>{
            btn.addEventListener('click', ({target:{dataset}}) =>{
                deletePass(dataset.id)
                alert("Contraseña eliminada correctamente");
                window.navigator.vibrate([500]);
                window.scrollTo(0, 0);
        
            })
           
        })


        const btnEdit = passContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach(btn =>{
            btn.addEventListener('click', async ({target:{dataset}}) =>{
                const doc = await editPass(dataset.id)
                const pass = doc.data()

                passForm['pass-site'].value = pass.site
                passForm['pass-username'].value = pass.username
                passForm['pass-password'].value = pass.password

                editStatus = true;
                id = doc.id;

                passForm['btn-pass-form'].innerText = "Modificar"
                window.scrollTo(0, 0);

            })
        })

        const btnShow = passContainer.querySelectorAll('.btn-show');
        btnShow.forEach(btn => {
            let isShowingPassword = false; // Variable para rastrear si se está mostrando la contraseña
            btn.addEventListener('click', () => {
                const passwordField = btn.parentNode.querySelector('input[type="password"]');
                if (passwordField.type === 'password' && !isShowingPassword) {
                    // Solicitar permiso de notificación
                    if ('Notification' in window) {
                        Notification.requestPermission()
                            .then(permission => {
                                if (permission === 'granted') {
                                    // El usuario permitió las notificaciones
                                    // Ahora puedes mostrar notificaciones
                                    const notification = new Notification('Contraseña Mostrada', {
                                        body: 'Tu contreseña se está mostrando -_-',
                                        icon: '/img/icon.jpg' // Reemplaza con la ruta de tu imagen de notificación
                                        
                                    });
                                   
                                    // Agregar un evento de clic a la notificación
                                    notification.addEventListener('click', () => {
                                        // Acción a realizar cuando se hace clic en la notificación
                                        console.log('La notificación fue clicada');
                                    });
                                }
                            })
                            .catch(error => {
                                console.error('Error al solicitar permiso para mostrar notificaciones:', error);
                            });
                    }
                    window.navigator.vibrate([5000]);
                    passwordField.type = 'text'; // Muestra la contraseña
                    btn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 19 20">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                        `;
                    isShowingPassword = true;
                    // Deshabilita el botón durante 10 segundos
                    btn.disabled = true;
                    setTimeout(() => {
                        passwordField.type = 'password';
                        btn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 19 20">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>`;
                        isShowingPassword = false;
                        btn.disabled = false; // Habilita el botón nuevamente
                       
                    }, 5000); // 10 segundos en milisegundos
                }
            });
        });






    });

});


passForm.addEventListener('submit', e => {
    e.preventDefault();

    const site = passForm['pass-site']
    const username = passForm['pass-username']
    const password = passForm['pass-password']

    //console.log(site.value, username.value, password.value)
    if(!editStatus){

        savePassword(site.value, username.value, password.value);
        window.navigator.vibrate([500]);
        alert("Guardado correctamente");
       
    }else{
        updatePass(id,{
           site: site.value, 
           username: username.value, 
           password: password.value
            
        });

        editStatus = false;
        passForm['btn-pass-form'].innerText = "Guardar Contraseña"
        window.navigator.vibrate([500]);
        alert("Datos actualizados correctamente");
        

    }
   
    passForm.reset();
})

