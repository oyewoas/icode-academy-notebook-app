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
          <h3>${note.title} <span class="pl-5 btn-edit"><i class="fas fa-edit"></i></span> <span class="pl-5 btn-delete"><i class="fas fa-trash-alt"></i></span> </h3> 
        </li>  `;
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
  
      // Disable submit on enter
      document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
          e.preventDefault();
          return false;
        }
      });
  
      // Edit icon click event
  
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
  