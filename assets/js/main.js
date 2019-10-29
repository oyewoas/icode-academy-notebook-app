const UI_SELECTORS = {
    deleteNoteBtn: '.btn-delete',
    noteViewBtn: '.btn-view',
    editNoteBtn: '.btn-edit',
    titleInput: '#note-title',
    informationInput: '#note-information',
    invalidInput: '#invalid-input',
    addNoteBtn: '#btn-add-note',
    savedNotesList: '#saved-notes',
    noNote: '#no-note',
    updateNoteForm: '#update-note',
    notesHeader: '.notes-header',
    updateNoteButton: '#btn-update-note',
    noteView: '#note-view',
    mainSection: '#main-section',
    detailsBtn: '.btn-details',
    mainText: '#main-text'
}

const titleInput = document.querySelector(UI_SELECTORS.titleInput)
const informationInput = document.querySelector(UI_SELECTORS.informationInput)
const addNoteButton = document.querySelector(UI_SELECTORS.addNoteBtn)
const noNote = document.querySelector(UI_SELECTORS.noNote)
const savedNotesList = document.querySelector(UI_SELECTORS.savedNotesList)
const updateNoteForm = document.querySelector(UI_SELECTORS.updateNoteForm)
const notesHeader = document.querySelector(UI_SELECTORS.notesHeader)
const invalidInput = document.querySelector(UI_SELECTORS.invalidInput)
const updateNoteButton = document.querySelector(UI_SELECTORS.updateNoteButton)
const noteView = document.querySelector(UI_SELECTORS.noteView)
const mainSection = document.querySelector(UI_SELECTORS.mainSection)
const noteDetailsButton = document.querySelector(UI_SELECTORS.detailsBtn)
const mainText = document.querySelector(UI_SELECTORS.mainText)



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
      <span class="pt-2 pr-3 text-right"> <span class="btn-edit " title="Edit Note"><i class="far fa-edit mr-1" ></i></span> <span class="btn-delete" title="Delete Note"><i  class="ml-1 far fa-trash-alt"></i></span> <span title="View Note" class="btn-view"><i class="ml-1 far fa-eye"></i></span> </span>
        <div class='card-body'>
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${information}</p>
        </div>
      </div> 
    </div>`
}

const noteViews = (id, title, information) => {
    noteView.innerHTML = `
    <div id='note-${id}' class='col-sm-12 '>
      <a class="btn-back" href="index.html">Go Back</a>
      <div class='mt-3 mb-3 card shadow' >
        <div class='card-body'>
          <h2 class="card-title">${title}</h2>
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
const deleteNoteFunction = (e) => {
    let notes = getNotesFromStorage()
    const currentNote = e.target.parentNode.parentNode.parentNode.parentNode
    const currentNoteId = currentNote.getAttribute('id')

    notes.forEach((note, index) => {
        const {
            id
        } = note
        if (`note-${id}` === currentNoteId) {
            currentNote.remove()
            notes.splice(index, 1)
            if (notes[0] === undefined) {
                noNote.textContent = 'Notes not added yet'
            }
            localStorage.setItem('notes', JSON.stringify(notes))
        }
    })
}

const updateNote = (noteId, updatedTitle, updatedInformation) => {
    let notes = getNotesFromStorage()
    notes.forEach((note) => {
        let {
            id
        } = note
        if (id === Number(noteId)) {
            note.title = updatedTitle;
            note.information = updatedInformation
        }

    })

    localStorage.setItem('notes', JSON.stringify(notes))
}

const updateNoteFunction = () => {
    const noteId = localStorage.getItem('currentNoteId')
    const isValidInput = checkIfValidInput(titleInput.value, informationInput.value)
    if (isValidInput) {
        updateNote(noteId, titleInput.value, informationInput.value)
        localStorage.removeItem('currentNoteId')
        notesHeader.textContent = 'My Notes'
        location.reload()
    }
}

const noteViewFunction = (e) => {
    let notes = getNotesFromStorage()
    const currentNote = e.target.parentNode.parentNode.parentNode.parentNode
    const currentNoteId = currentNote.getAttribute('id')
    notes.forEach((note) => {
        const {
            id,
            title,
            information
        } = note
        if (`note-${id}` === currentNoteId) {
            savedNotesList.classList.add('d-none')
            mainSection.classList.add('d-none')
            noteDetailsButton.classList.add('d-none')

            notesHeader.textContent = 'My Note'
            noteViews(id, title, information)

        }
    })

}

const editNoteFunction = (e) => {
    let notes = getNotesFromStorage()
    const currentNote = e.target.parentNode.parentNode.parentNode.parentNode
    const currentNoteId = currentNote.getAttribute('id')
    notes.forEach((note) => {
        const {
            id,
            title,
            information
        } = note
        if (`note-${id}` === currentNoteId) {
            savedNotesList.classList.add('d-none')
            updateNoteButton.classList.remove('d-none')
            addNoteButton.classList.add('d-none')
            noteDetailsButton.classList.add('d-none')
            mainText.textContent = 'Edit your awesome Note'
            notesHeader.textContent = ''
            titleInput.value = title;
            informationInput.value = information
            localStorage.setItem('currentNoteId', id)
        }
    })
}


const addEventListenerToButton = (elements, neededFunction) => {
    elements.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            neededFunction(e)
        })
    })

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
        location.reload()

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
        const {
            id,
            title,
            information
        } = note
        savedNotes(id, title, information)

    })

    const deleteNoteButton = document.querySelectorAll(UI_SELECTORS.deleteNoteBtn)
    const editNoteButton = document.querySelectorAll(UI_SELECTORS.editNoteBtn)
    const noteViewButton = document.querySelectorAll(UI_SELECTORS.noteViewBtn)


    addEventListenerToButton(deleteNoteButton, deleteNoteFunction)
    addEventListenerToButton(editNoteButton, editNoteFunction)
    addEventListenerToButton(noteViewButton, noteViewFunction)

}


//Event Listeners
addNoteButton.addEventListener('click', addNoteFunction)
updateNoteButton.addEventListener('click', updateNoteFunction)


//Initialize Application
const APP = {
    start: (start)(),
}

APP.start;
