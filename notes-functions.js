// check for existing saved data
let getSavedNotes = () => {
    let notesJSON = localStorage.getItem('notes')
    return notesJSON !== null ? JSON.parse(notesJSON) : []
    }

// save items in local storage 
let saveNotes = (notes)=> {
    localStorage.setItem('notes', JSON.stringify(notes))
}


// Remove a note by id
const removeNote = (id)=> {
    const noteIndex = notes.findIndex((note) => note.id === id)

    // -1 because indexing starts from zero. index -1 would be = undefined
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
   
}
// change verified value for note
let checkNote = function(id){
    // return if note (id) exists
    let noteIndex = notes.find((note) => note.id === id )

        if (noteIndex !== undefined){
        // here we flip the value to its opposite when checking/unchecking
        return noteIndex.verified = !noteIndex.verified
    }
}


// Generate DOM element
let createNoteDOM = (note) => {
    // crete div and span (p) for each element
    let newNote = document.createElement('div')
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    newNote.appendChild(checkbox)
    // console.log(time.fromNow())
    // config checkbox 
    checkbox.checked = note.verified
    // each newEL is an hyperlink (aka 'a')
    let newEl = document.createElement('a')
    // set up the remove note button
    let button = document.createElement('button')
    button.textContent = 'x'
    newNote.appendChild(button)



    // Config button
    button.addEventListener('click', () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)   

    })
    // config checkbox
    checkbox.addEventListener('change', function(){
        checkNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)

    })
    
    // set up note text
    if (note.title.length > 0){
        // newEl.textContent = `${note.title}. Note verified ${note.verified}` 
        newEl.textContent = `${note.title}`  
    } else {

        newEl.textContent = 'Unnamed note'
        
    }   
    // Add link to each created note
        ashLink = '/notes-edit.html#' + note.id
        newEl.setAttribute('href', ashLink)
        newNote.appendChild(newEl)
        
        return newNote 
      
}
// Sort notes
const sortNotes =  (notes, sortBy) => {
    if (sortBy === 'byEdited'){
        return notes.sort( (a, b) => {
        // updatedAt is a timestamp. The greater the timestamp the more recent the date it represents
            if (a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt){
                return 1
            } else {
                return 0
            }
        })

    } else if (sortBy === 'byCreated'){
        return notes.sort( (a, b)=> {
            if (a.createdAt > b.createdAt){
                return -1
            } else if (a.createdAt < b.createdAt){
                return 1
            } else {
                return 0
            }
            
        })

    } else if (sortBy === 'Alphabetical'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1               
            } else {
                return 0
            }
        })
    } else {
        return notes
    }

}



// Render notes
const renderNotes = (object, filter) => {
    notes = sortNotes(notes, filters.sortBy)
    let filteredNotes = object.filter(function(note){
        let matchText = note.title.toLowerCase().includes(filter.searchText.toLowerCase())
        let matchCompleted = !filter.hideVerified || !note.verified
        return matchText && matchCompleted
    })
    // create the filter for the checkbox (to check for completed notes). // initially called 'verified' 
    // Set a new value for filter notes, when we filter by completed
    let unverifiedNotes = filteredNotes.filter(function(note){
        return !note.verified
    })
    // This however will add the paragraph note every time we type a letter that matches is
    // What we will do instead is, add the note in the <div> and delete the div content each time
    document.querySelector('#notes').innerHTML=''

    // get summary
    document.querySelector('#notes').appendChild(getSummary(unverifiedNotes))

    // Add paragraph for each filtered note  
    filteredNotes.forEach((note) => {
        newNote = createNoteDOM(note)
          document.querySelector('#notes').appendChild(newNote)
      })
  
  }
// create summary
let getSummary = (unverifiedNotes)=> {
    let summary = document.createElement('h2')
    summary.textContent = `You have ${unverifiedNotes.length} incomplete tasks`
    return summary
}

// Generate last edited message
const generateLastEdited =  (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}