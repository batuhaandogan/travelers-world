document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('fetch-new-movie').onclick = () => {
    axios.get('http://localhost:3000/private')
    .then((createThings)=>{

console.log(createThings,'======2=2=2=2==2=2=2=2=2')

     
      const resultDiv = document.getElementById('post-here')

     

        console.log(createThings)
        resultDiv.innerHTML += `
     
        <textarea name="comment" form="usrform">Enter text here...</textarea>
        `
        // fetchAllMovies();

      })
    .catch((err)=>{
      console.log(err)
    })


  }

//button for comment creation


// const createCommentButton = document.getElementById('create-button')

// function toogle (){
//   const divForm= document.getElementById("createCommentFormDiv")
//   console.log('toggleform')
//   if (divForm.style.display === "block") {
//     divForm.style.display = "none";
// } else {
//   divForm.style.display = "block";
// }

// }
// createCommentButton.onclick= toogle






}, false);
