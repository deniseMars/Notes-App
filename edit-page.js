document.querySelector('#go-back').addEventListener('click', function(){
    // assign method works as href
    location.assign('/notesUseMe-app.html')
})
// get the hash aka note id
const getID = location.hash.substring(1)
// get the notes (localStorage is global)
let notes = getSavedNotes()
// see if getID matches the note
let note = notes.find((note)=> note.id === getID)

// kick out the user if note id is not defined
if (note === undefined){
    // DOES NOT WORK
    location.assigned('/notesUseMe-app.html')
    }


// Create easy access title and body var
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-verified')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

// Pre-populate edit page with note info
noteTitle.value = note.title
noteBody.value = note.description 
dateElement.textContent = generateLastEdited(note.updatedAt)

// Update and save the title
noteTitle.addEventListener('input',  (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Update and save the body
noteBody.addEventListener('input', (e) => {
    note.description = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Remove button
removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notesUseMe-app.html')
})

// window we use it to interact with the window doc
// storage event fires every time the local storage changes (e.g. we change note content)
window.addEventListener('storage', function(e){
    if (e.key === 'notes') {
// parse JSON newValue and save in notes array
        notes = JSON.parse(e.newValue)
        // duplicate code in case note is deleted (to simmer down)
        let note = notes.find((note) => note.id === getID)

        // kick out the user if note id is not defined
        if (note === undefined){
            // DOES NOT WORK
            location.assigned('/notesUseMe-app.html')
            }
        noteTitle.value = note.title
        noteBody.value = note.description
        dateElement.textContent = generateLastEdited(note.updatedAt)
    
    }
})
