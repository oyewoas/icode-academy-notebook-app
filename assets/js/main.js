const UI_SELECTORS = {
    titleInput: '#note-title',
    informationInput: '#note-information',
    invalidInput: '#invalid-input',
    addNoteBtn: '#btn-add-note',
    savedNotesList: '#saved-notes',
    noNote: '#no-note'
}

const titleInput = document.querySelector(UI_SELECTORS.titleInput)
const informationInput = document.querySelector(UI_SELECTORS.informationInput)
const addNoteButton = document.querySelector(UI_SELECTORS.addNoteBtn)
const noNote = document.querySelector(UI_SELECTORS.noNote)
const invalidInput = document.querySelector(UI_SELECTORS.invalidInput)
const savedNotesList = document.querySelector(UI_SELECTORS.savedNotesList)

//Validation FUnction
const checkIfValidInput = (title, information) => {
    if (title !== '' && information !== '') {
        return true
    } else {
        const message = 'Inputs cannot be empty'
        invalidInput.textContent = message
        return false
    }

}


//Controller Functions
const eachNote = (id, title, information) => {
    let note;
    const isValidInput = checkIfValidInput(title, information)

    if (isValidInput) {
        note = {
            id,
            title,
            information
        }
    }
    return note

}

const savedNotes = (id, title, information) => {
    savedNotesList.innerHTML += `
    <div id='note-${id}' class='col-sm-4'>
      <div class='mt-3 mb-3 shadow card' >
        <div class='card-body'>
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${information}</p>
        </div>
      </div> 
    </div>`
}

const getNotesFromStorage = () => {
    let notes;
    if (localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;

}

const clearFields = () => {
    titleInput.value = ''
    informationInput.value = ''
    noNote.textContent = ''
    invalidInput.textContent = ''

}

const addNoteFunction = () => {
    let ID;
    let notes = getNotesFromStorage()
    if (notes.length > 0) {
        ID = notes[notes.length - 1].id + 1;
    } else {
        ID = 0;
    }

    const note = eachNote(ID, titleInput.value, informationInput.value)

    if (note !== undefined) {
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes))
        savedNotes(note.id, note.title, note.information)
        clearFields()
    }
    return notes
}

const start = () => {
    let notes = getNotesFromStorage()
    notes = notes.slice(0, 9)
    if (!notes || notes[0] === undefined) {
        noNote.textContent = 'Notes not added yet'
    }
    notes.forEach((note) => {
        const {id, title, information} = note
        savedNotes(id, title, information)

    })
}


//Event Listeners
addNoteButton.addEventListener('click', addNoteFunction)


//Initialize Application
const APP = {
    start: (start)(),
}

APP.start;
