// NOTE: OLD CODE IS STORED AT THE BUTTON OF THE IDE
// Here we will begin again our script for the notes-app. Starting clean, keeping 
// the original for reference on functions.
let notes = getSavedNotes()

// create a filter object, where search values will be stored
const filters = {
    // we will create a function to filter text, using the values in searchText
        searchText: '',
        hideVerified: false
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
    console.log(e.target.value)
})

// create note
document.querySelector('#create-note').addEventListener('submit', function(e){
    e.preventDefault()
    const id = uuidv4()
    notes.push({
    // Create unique identifier using the uudiv4 method
        id: id,
        title: e.target.elements.text.value,
        verified: false,
      
        
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

// Use the moment library for dates
const now = moment()
// console.log(now.toString())
// now.subtract(3, 'month').subtract(21, 'days').subtract(25, 'year')
// const myBD = now.format('MMM D, YYYY')
// console.log(myBD)
console.log(now.valueOf())