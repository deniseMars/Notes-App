document.querySelector('#go-back').addEventListener('click', function(){
    // assign method works as href
    location.assign('/notesUseMe-app.html')
})
// get the hash aka note id
const getID = location.hash.substring(1)
// get the notes (localStorage is global)
let notes = getSavedNotes()
// see if getID matches the note
let note = notes.find(function(note){
    return note.id === getID
    })
// kick out the user if note id is not defined
if (note === undefined){
    // DOES NOT WORK
    location.assigned('/notesUseMe-app.html')
    }


// Create easy access title and body var
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-verified')
const removeElement = document.querySelector('#remove-note')

// Pre-populate edit page with note info
noteTitle.value = note.title
noteBody.value = note.verified 

// Update and save the title
noteTitle.addEventListener('input', function (e){
    note.title = e.target.value
    saveNotes(notes)
})

// Update and save the body
noteBody.addEventListener('input', function(e){
    note.verified = e.target.value
    saveNotes(notes)
})

// Remove button
removeElement.addEventListener('click', function(e){
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notesUseMe-app.html')
})

// window we use it to interact with the window doc
// storage event fires every time the local storage changes (e.g. we change note content)
