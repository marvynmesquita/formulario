

const cpfInput = document.querySelector('#cpf'),
    cepInput = document.querySelector('#cep'),
    estadoInput = document.querySelector('#estado'),
    emailInput = document.querySelector('#email'),
    telefoneInput = document.querySelector('#celular'),
    checkbox = document.querySelector('.form-check-input'),
    nameInput = document.querySelector('#name'),
    addrInput = document.querySelector('#endereco'),
    bairroInput = document.querySelector('#bairro'),
    cidadeInput = document.querySelector('#cidade'),
    form = document.querySelector('.form-group'),
    saveBtn = document.querySelector('.form-btn');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

const estadosSiglas = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
]

const validate_cep =  async(cep) => {
    if (cep.length === 9) {
        const url = apiCep(cep);
        const data = await fetch(url);
        if (data.status == 200) {
            cepInput.classList.remove('is-invalid');
            cepInput.classList.add('is-valid');
        }
        else {
            cepInput.classList.remove('is-valid');
            cepInput.classList.add('is-invalid');
        }
        console.log(data);
    }
    else{
        cepInput.classList.remove('is-valid');
        cepInput.classList.add('is-invalid');
    };
}

const apiCep = (cep) => `https://cdn.apicep.com/file/apicep/${cep}.json`

emailInput.addEventListener('keyup',() =>{
    if(this.value !== ""){
        if(emailInput && emailInput.value){
            if(!validateEmail(emailInput.value)){
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
                emailInput.focus();
            }else{
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                emailInput.focus();
        }};
    }
} );

cpfInput.addEventListener( 'keydown', (e) => {
    key = e.which || e.keyCode || e.charCode;
    if (isNaN(e.key) === true) {
        if (key !== 8){
            cpfInput.value = cpfInput.value.slice(0, -1)
            cpfInput.classList.add('is-invalid');
        }
    } else if (key === 8) {
        if (cpfInput.value.length === 5) {
            cpfInput.value = cpfInput.value.slice(0, 4);
        } else if (cpfInput.value.length === 9) {
            cpfInput.value = cpfInput.value.slice(0, 8);
        } else if (cpfInput.value.length === 13) {
            cpfInput.value = cpfInput.value.slice(0, 12);
        }
    }
})

cpfInput.addEventListener('keyup', () => {
    if(cpfInput.value.length === 3) {
        cpfInput.value += '.'
    } else if(cpfInput.value.length === 7) {
        cpfInput.value += '.'
    } else if(cpfInput.value.length === 11) {
        cpfInput.value += '-'
    } else if (cpfInput.value.length === 13) {
        cpfInput.classList.remove('is-invalid')
        cpfInput.classList.add('is-valid')
    }
})

estadoInput.addEventListener('keyup', () => {
    estadoInput.value = estadoInput.value.toUpperCase();
    if (estadoInput.value.length === 2) {
        if (estadosSiglas.indexOf(estadoInput.value) !== -1) {
            estadoInput.classList.remove('is-invalid');
            estadoInput.classList.add('is-valid');
        } else {
            estadoInput.classList.remove('is-valid');
            estadoInput.classList.add('is-invalid');
        }
    }
})

cepInput.addEventListener('keydown', (e) => {
    key = e.which || e.keyCode || e.charCode;
    if (isNaN(e.key) === true) {
        if (key !== 8){
            cpfInput.value = cpfInput.value.slice(0, -1)
            cpfInput.classList.add('is-invalid');
        }
    } else if (key === 8) {
        if(cepInput.value.length === 7){
            cepInput.value = cepInput.value.slice(0, 6);
        }
    } else if (cepInput.value.length === 5) {
        cepInput.value += '-';
    }
})

telefoneInput.addEventListener('keydown', (e) => {
    key = e.which || e.keyCode || e.charCode;
    if (isNaN(e.key) === true) {
        if (key !== 8){
            cpfInput.value = cpfInput.value.slice(0, -1)
            cpfInput.classList.add('is-invalid');
        } else if (key === 8) {
            if(telefoneInput.value.length === 2){
                telefoneInput.value = ''
            } else if(telefoneInput.value.length === 4){
                telefoneInput.value = telefoneInput.value.slice(0, 3)
            } else if(telefoneInput.value.length === 11) {
                telefoneInput.value = telefoneInput.value.slice(0, 10)
            }
        }
    }
})

cepInput.addEventListener('keyup', () => {
    validate_cep(cepInput.value)
});

telefoneInput.addEventListener('keyup', () => {
    if(telefoneInput.value.length === 1){
        telefoneInput.value = '(' +  telefoneInput.value
    } else if(telefoneInput.value.length === 3){
        telefoneInput.value += ') '
    } else if(telefoneInput.value.length === 10) {
        telefoneInput.value += '-'
    } else if(telefoneInput.value.length === 15) {
        telefoneInput.classList.remove('is-invalid')
        telefoneInput.classList.add('is-valid')
    }
});
saveBtn.classList.add('normal');

saveBtn.addEventListener('mouseenter', () => {
    if (!checkbox.checked) {
        if(saveBtn.classList.contains('normal')) {
            saveBtn.classList.remove('normal');
            saveBtn.classList.add('left');
        } else if(saveBtn.classList.contains('left')) {
            saveBtn.classList.remove('left');
            saveBtn.classList.add('normal2');
        } else if(saveBtn.classList.contains('normal2')) {
            saveBtn.classList.remove('normal2');
            saveBtn.classList.add('right');
        } else if(saveBtn.classList.contains('right')) {
            saveBtn.classList.remove('right');
            saveBtn.classList.add('normal');
        }
    } else {
        saveBtn.classList.add('normal');
    }
});

window.jsPDF = window.jspdf.jsPDF;

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    doc.setFontSize(18)
    doc.text('Cadastro', 10, 10)
    doc.setFontSize(14);
    doc.text('Nome: ' + nameInput.value, 10, 20)
    doc.text('E-mail:'+ emailInput.value, 10, 30)
    doc.text('CPF:'+ cpfInput.value, 10, 40)
    doc.text('Endereço: ' + addrInput.value + ' - ' + bairroInput.value + ' - ' + cidadeInput.value + ' - ' + estadoInput.value, 10, 50)
    doc.text('CEP: ' + cepInput.value, 10,60)
    doc.text('Celular:'+ telefoneInput.value, 10, 70)
    console.log(doc)
    if (checkbox.checked) {
        doc.save('cadastro.pdf');
    }
});