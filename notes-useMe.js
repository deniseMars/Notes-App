// NOTE: OLD CODE IS STORED AT THE BUTTON OF THE IDE
// Here we will begin again our script for the notes-app. Starting clean, keeping 
// the original for reference on functions.
let notes = getSavedNotes()

// create a filter object, where search values will be stored
const filters = {
    // we will create a function to filter text, using the values in searchText
        searchText: '',
        hideVerified: false,
        sortBy: 'byEdited'
    }
    
renderNotes(notes, filters)

// Render filtered notes
document.querySelector('#search-box').addEventListener('input', function(e){
// Add the value of the input to the filters.seachText object
    filters.searchText = e.target.value
// Call the function
    renderNotes(notes, filters)
})

// Activated dropdown list
document.querySelector('#filterBy').addEventListener('change', function(e){
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

// create note
document.querySelector('#create-note').addEventListener('submit', function(e){
    e.preventDefault()
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
    // Create unique identifier using the uudiv4 method
        id: id,
        title: e.target.elements.text.value,
        verified: 'Insert description',
        createdAt: timestamp,
        updatedAt: timestamp
      
        
    })
    saveNotes(notes)
    // localStorage.setItem('notes', JSON.stringify(notes))
    // The ash provides access to the item in the URL after it.  
    location.assign(`/notes-edit.html#${id}`)
    // renderNotes(notes, filters)
   
    e.target.elements.text.value = ''
})

// sync change title 
window.addEventListener('storage', function(e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})
