// check for existing saved data
let getSavedNotes = function(){
    let notesJSON = localStorage.getItem('notes')
    if (notesJSON !== null){
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// save items in local storage 
let saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}


// Remove a note by id
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    }) 
    // -1 because indexing starts from zero. index -1 would be = undefined
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
   
}
// change verified value for note
let checkNote = function(id){
    let noteIndex = notes.find(function(note){
        // return if note (id) exists
        return note.id === id
    })
        if (noteIndex !== undefined){
        // here we flip the value to its opposite when checking/unchecking
        return noteIndex.verified = !noteIndex.verified
    }
}


// Generate DOM element
let createNoteDOM = function(note){
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
    button.addEventListener('click', function(){
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


// Render notes
const renderNotes = function(object, filter){
    let filteredNotes = object.filter(function(note){
        let matchText = note.title.toLowerCase().includes(filter.searchText.toLowerCase())
        let matchCompleted = !filter.hideVerified || !note.verified
        return matchText && matchCompleted
    })
    // create the filter for the checkbox (to check for verified notes). 
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
    filteredNotes.forEach(function(note){
        newNote = createNoteDOM(note)
          document.querySelector('#notes').appendChild(newNote)
      })
  
  }
// create summary
let getSummary = function(unverifiedNotes){
    let summary = document.createElement('h2')
    summary.textContent = `You have ${unverifiedNotes.length} incomplete tasks`
    return summary
}

// Generate last edited message
const generateLastEdited = function (timestamp){
    return `Last edited ${moment(timestamp).fromNow()}`
}