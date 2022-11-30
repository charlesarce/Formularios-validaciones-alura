 export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
     }
     if (input.validity.valid) {
         input.parentElement.classList.remove('input-container--invalid');
         input.parentElement.querySelector(".input-message-error").innerHTML =""
         
     } else {
         input.parentElement.classList.add('input-container--invalid');
         input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
         
     }
    
}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
    ]

const mensajesDeError = {
    nombre:{
        valueMissing: 'Este campo no puede esar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede esar vacio',
        typeMismatch:" El correo no es valido",
        
    },
    password: {
        valueMissing: 'Este campo no puede esar vacio',
        patternMismatch:"Al menos 6 caracteres,debe contener una letra minuscula y un numero"    
    },
    nacimiento: {
        valueMissing: 'Este campo no puede esar vacio',
        customError:"Debes Tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: 'Este campo no puede esar vacio',
        patternMismatch:"El formato requerio es xxxxxxxxxx (10 numeros)"
        
    },
    direccion: {
        valueMissing: 'Este campo no puede esar vacio',
        patternMismatch:"La direccion debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: 'Este campo no puede esar vacio',
        patternMismatch:"La ciudad debe contener entre 4 y 40 caracteres"
    },
    estado: {
        valueMissing: 'Este campo no puede esar vacio',
        patternMismatch:"El estado debe contener entre 4 y 40 caracteres"
    }
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje=mensajesDeError[tipoDeInput][error]
        }
        
    });
    return mensaje
}

function validarNacimiento(input) { 
    const fechaCliente = new Date(input.value); 
  
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje="Debes Tener al menos 18 años de edad";
    }
  input.setCustomValidity(mensaje);
}


function mayorDeEdad(fecha) {
    const fechaActual = new Date()
    const differenciaFecha = new Date(
        fecha.getUTCFullYear()+18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    )
    return differenciaFecha <= fechaActual
}