const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const btnAdd = document.querySelector('#btn-add')
const noTareas = document.querySelector('#no-tareas')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let list
let contTareas = 0

//fecha correcta con el navegador
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', {weekday:'long', month:'short', day:'numeric'})

//función para agregar tareas
function agregarTarea (tarea, id, realizado, eliminado) {

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :''

    const elemento = ` <li id="elemento">
                            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                            <p class="text ${LINE}">${tarea}</p>
                            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                     `
    lista.insertAdjacentHTML("beforeend", elemento)
    noTareas.innerHTML = ''
    contTareas++
}

//función de tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    //con .parentNode accede al elemento padre y busca una clase que se llame text ('.text')
    list[element.id].realizado = list[element.id].realizado ?false :true
}

//función de datea eliminada
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    //con el primer .parentNode vamos a <li> con el segundo .parentNode va a <ul> y le indica que borre al padre del elemento que le hemos pasado por parámetro
    list[element.id].eliminado = true
    contTareas--
    if (contTareas == 0) { noTareas.innerHTML = 'Wow!!<br>No tienes ninguna tarea pendiente, enhorabuena!!'}
}

//Agregar nueva tarea al pulsar el botón +
btnAdd.addEventListener('click', () => {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea, id, false, false)
        list.push({
            nombre: tarea,
            id: id,
            realizado: false,
            borrado: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(list))
    input.value = ''
    id++
})

//Agregar nueva tarea al pulsar la tecla ENTER
document.addEventListener('keyup', function(event){
    if(event.key == 'Enter') {
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea, id, false, false)
            list.push({
                nombre: tarea,
                id: id,
                realizado: false,
                borrado: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(list))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'realizado') {
        tareaRealizada(element)
    } 
    else if(elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(list))
})

//local storage get item
let data = localStorage.getItem('TODO')
if (data) {
    list = JSON.parse(data)
    id = list.length
    cargarLista(list)
} else {
    list = []
    id = 0
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })
}