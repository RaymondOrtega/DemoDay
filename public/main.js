// var story= document.getElementsByClassName('storyInput')
var trash = document.querySelectorAll(".fa-trash");
// Array.from(story).forEach(function(element) {
//       element.addEventListener('click', function(){
//       console.log("You Clicked Button Color Change")
//
//         console.log(buttonCo,message,name);
//         fetch('buttonColor', {
//           method: 'put',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'stories': stories,
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', () => {
        const name = this.childNodes[1].innerText
        const stories = this.childNodes[3].innerText
        console.log(name);
        console.log(stories);
        fetch('deleteStories', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'stories': stories
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
