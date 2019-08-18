var up = document.getElementsByClassName('fa-thumbs-up');
var down = document.getElementsByClassName('fa-thumbs-down');
var trash = document.querySelectorAll(".fa-trash");
var post = document.getElementsByClassName("postStory");
var update = document.querySelectorAll(".update");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const user = this.parentNode.childNodes[1].innerHTML
    const stories = this.parentNode.childNodes[9].innerHTML
    console.log(stories);
    console.log(user);
    fetch('deleteStories', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'users': user,
        'stories': stories
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});
Array.from(post).forEach(function(element) {
  element.addEventListener('click', function() {
    const user = this.parentNode.childNodes[1].innerHTML
    const stories = this.parentNode.childNodes[9].innerHTML
    console.log(user);
    console.log(stories);
    // console.log(post);
    fetch('postStory', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': user,
        'stories': stories,
        'postStory': true
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});
Array.from(update).forEach(function(element) {
  element.addEventListener('click', function() {

    const user = this.parentNode.childNodes[3].value
    const stories = this.parentNode.childNodes[9].value
    const genre = this.parentNode.childNodes[13].value
    const title = this.parentNode.childNodes[7].value
    const testID = document.querySelector('.weee').value
    console.log(genre);
    console.log(title);
    console.log(user);
    console.log(stories);
    console.log(testID);
    // console.log(post);
    fetch('updateStory', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': user,
        'stories': stories,
        'title': title,
        'genre': genre,
        'timeStamp': testID
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

Array.from(down).forEach(function(element) {
  element.addEventListener('click', function() {
    const stories = this.parentNode.parentNode.childNodes[1].childNodes[9].innerHTML
    const user = this.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerHTML)
    console.log(thumbDown)
    fetch('thumbDown', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'thumbDown': thumbDown,
          'username': user,
          'stories': stories
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});
Array.from(up).forEach(function(element) {
  element.addEventListener('click', function() {
    const stories = this.parentNode.parentNode.childNodes[1].childNodes[9].innerHTML
    const user = this.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerHTML)
    console.log(thumbUp);
    console.log(stories);
    console.log(user);
    fetch('thumbUp', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'thumbUp': thumbUp,
          'username': user,
          'stories': stories
        })
      }).then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});
// fetch('updateComment', {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'userPosted':userPosted,
//       'feedMsg': feedMsg,
//       'feedDate':feedDate,
//       'currentUser': currentUser,
//       'comment': comment
//     })
//   })
//   .then(response => {
//     console.log(response);
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
