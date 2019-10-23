// Storage Controller
const StorageCtrl = (function() {
    // Public methods
    return {
      storeNote: (note) => {
        let notes;
        // Check if notes is in ls
        if(localStorage.getItem('notes') === null){
          notes = [];
          // Push new note
          notes.push(note);
          // Set ls
          localStorage.setItem('notes', JSON.stringify(notes));
        } else {
          // Get what is already in ls
          notes = JSON.parse(localStorage.getItem('notes'));
  
          // Push new note
          notes.push(note);
  
          // Re set ls
          localStorage.setItem('notes', JSON.stringify(notes));
        }
      },
      getNotesFromStorage: function() {
        let notes;
        if(localStorage.getItem('notes') === null){
          notes = [];
        } else {
          notes = JSON.parse(localStorage.getItem('notes'));
        }
        return notes;
      },
      updateNoteInStorage: (updatednote) => {
        let notes = JSON.parse(localStorage.getItem('notes'));
  
        notes.forEach((note, index) => {
          if(updatedNote.id === note.id){
            notes.splice(index, 1, updatednote);
          }
        });
        localStorage.setItem('notes', JSON.stringify(notes));
      },
      deleteNoteFromStorage: (id) => {
        let notes = JSON.parse(localStorage.getItem('notes'));
  
        notes.forEach((note, index) => {
          if(id === note.id){
            notes.splice(index, 1);
          }
        });
        localStorage.setItem('notes', JSON.stringify(notes));
      },
      clearNotesFromStorage: function() {
        localStorage.removeItem('notes');
      }
    }
  })();


  // Note Controller
const NoteCtrl = (function() {
    // Item Constructor
    const Note = function(id, title, information){
      this.id = id;
      this.title = title;
      this.information = information;
    }
  
    // Data Structure / State
    const data = {
      notes: StorageCtrl.getNotesFromStorage(),
      currentNote: null
    }
  
    // Public methods
    return {
      getNotes: function() {
        return data.notes;
      },
      
      addNote: (title, information) => {
        let ID;
        // Create ID
        if(data.notes.length > 0){
          ID = data.notes[data.notes.length - 1].id + 1;
        } else {
          ID = 0;
        }
  
        // Create new note
        newNote = new Note(ID, title, information);
  
        // Add to notes array
        data.notes.push(newNote);
  
        return newNote;
      },
      getNoteById: (id) => {
        let noteFound = null;
        // Loop through notes
        data.notes.forEach((note) => {
          if(note.id === id){
            found = note;
          }
        });
        return noteFound;
      },
      updateNote: (title, information) => {
        let noteFound = null;
  
        data.notes.forEach((note) => {
          if(note.id === data.currentNote.id){
            note.title = title;
            note.information = information;
            noteFound = note;
          }
        });
        return noteFound;
      },
      deleteNote: (id) => {
        // Get ids
        const ids = data.notes.map((note) => {
          return note.id;
        });
  
        // Get index
        const index = ids.indexOf(id);
  
        // Remove note
        data.notes.splice(index, 1);
      },
      clearAllNotes: function() {
        data.notes = [];
      },
      setCurrentNote: (note) => {
        data.currentNote = note;
      },
      getCurrentNote: function() {
        return data.currentNote;
      },
      logData: function() {
        return data;
      }
    }
  })();
  
  



  // UI Controller
const UICtrl = (function(){
    const UISelectors = {
      savedNotes: '#saved-notes',
      notesList: '#saved-notes li',
      addNoteBtn: '.btn-add-note',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      noteTitleInput: '#note-title',
      noteInformationInput: '#note-information',
    }
  
    // Public methods
    return {
      populateSavedNotes: (notes) => {
        let html = '';
  
        notes.forEach((note) => {
          html += `<li class="note-collection" id="note-${note.id}">
          <h3>${note.title} </h3> 
        </li>`;
        });
  
        // Insert list items
        document.querySelector(UISelectors.savedNotes).innerHTML = html;
      },
      getNoteInput: function() {
        return {
          title:document.querySelector(UISelectors.noteTitleInput).value,
          information:document.querySelector(UISelectors.noteInformationInput).value
        }
      },
      addNote: function(note) {
        // Show the list
        document.querySelector(UISelectors.savedNotes).style.display = 'block';
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'note-collection';
        // Add ID
        li.id = `note-${note.id}`;
        // Add HTML
        li.innerHTML = `<li class="note-collection" id="note-${note.id}">
        <h3>${note.title} </h3> 
      </li>`;
        // Insert note
        document.querySelector(UISelectors.savedNotes).insertAdjacentElement('beforeend', li)
      },
      updateNote: function(note) {
        let notesList = document.querySelectorAll(UISelectors.notesList);
  
        // Turn Node list into array
        notesList = Array.from(notesList);
  
        notesList.forEach((theNote) => {
          const noteID = theNote.getAttribute('id');
  
          if(noteID === `note-${note.id}`){
            document.querySelector(`#${noteID}`).innerHTML = `<h3>${theNote.title}: </h3> `;
          }
        });
      },
      deleteNote: function (id) {
        const noteID = `#note-${id}`;
        const note = document.querySelector(noteID);
        note.remove();
      },
      clearInput: function () {
        document.querySelector(UISelectors.noteTitleInput).value = '';
        document.querySelector(UISelectors.noteInformationInput).value = '';
      },
      addNoteToForm: function () {
        document.querySelector(UISelectors.noteTitleInput).value = NoteCtrl.getCurrentNote().title;
        document.querySelector(UISelectors.noteInformationInput).value = NoteCtrl.getCurrentNote().information;
        UICtrl.showEditState();
      },
      removeNotes: function () {
        let notes = document.querySelectorAll(UISelectors.notesList);
  
        // Turn Node list into array
        notes = Array.from(notes);
  
        listItems.forEach(function (note) {
          note.remove();
        });
      },
      
      hideNotes: function() {
        document.querySelector(UISelectors.savedNotes).style.display = 'none';
      },
      clearEditState: function () {
        UICtrl.clearInput();
        // document.querySelector(UISelectors.updateBtn).style.display = 'none';
        // document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        // document.querySelector(UISelectors.backBtn).style.display = 'none';
        // document.querySelector(UISelectors.addNoteBtn).style.display = 'inline';
      },
      getSelectors: function() {
        return UISelectors;
      }
    }
  })();
  
  
  
  // App Controller
  const App = ( function(NoteCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function() {
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();
  
      // Add item event
      document.querySelector(UISelectors.addNoteBtn).addEventListener('click', addNoteSubmit);
  
      // Disable submit on enter
      document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
          e.preventDefault();
          return false;
        }
      });
  
      // Edit icon click event
  
    }
  
    // Add item submit
    const addNoteSubmit = function(e) {
      // Get form input from UI Controller
      const input = UICtrl.getNoteInput();
      console.log(input, 'input')
  
      // Check for name and calorie input
      if(input.title !== '' && input.information !== ''){
        // Add item
        const newNote = NoteCtrl.addNote(input.title, input.information);
        console.log(newNote, 'new note')
        // Add item to UI list
        UICtrl.addNote(newNote);
  
        //Store in localStorage
        StorageCtrl.storeNote(newNote);

        // Clear fields
        UICtrl.clearInput();
      }
  
      e.preventDefault();
    }
  
    // Public methods
    return {
      init: function(){
        // Clear edit state / set initial set
        UICtrl.clearEditState();
  
        // Fetch items from data structure
        const notes = NoteCtrl.getNotes();
  
        // Check if any items
        if(notes.length === 0){
          UICtrl.hideNotes();
        } else {
          // Populate list with items
          UICtrl.populateSavedNotes(notes);
        }
        // Load event listeners
        loadEventListeners();
      }
    }
  
  })(NoteCtrl, StorageCtrl, UICtrl);
  
  // Initialize App
  App.init();
  