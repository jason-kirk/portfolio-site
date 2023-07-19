// Collecting Blog posts

const BASE_DOMAIN = 'https://jason-kirk.hashnode.dev/'

const query = `
{
  user(username:"jkirk") {
   publication {
     posts(page:0) {
       title
       brief
       slug
       cuid
       dateAdded
       dateUpdated
       dateFeatured
       coverImage
     }
   }
 }
}`

async function getData() {
  const response = await fetch("https://api.hashnode.com", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: query })
  });
  const body = await response.json();
   
  return body.data.user.publication.posts
}

function sortPostsUpload(postA, postB){

  // If the post is featured, make sure that one is at the top
  if(postB.dateFeatured || postA.dateFeatured)
    return new Date(postB.dateFeatured) - new Date(postA.dateFeatured)

  // Keep new posts at the top (or updates!)
  if(postB.dateUpdated && postB.dateUpdated)
    return new Date(postB.dateUpdated) - new Date(postA.dateUpdated)
  else if(postB.dateUpdated)
    return new Date(postB.dateUpdated) - new Date(postA.dateAdded)
  else if(postA.dateUpdated)
    return new Date(postB.dateAdded) - new Date(postA.dateUpdated)
  return new Date(postB.dateAdded) - new Date(postA.dateAdded)    
}

async function ApplyData(){
  let posts = await getData()
  posts = Array.from(posts)

  // Make sure the posts are sorted so the best ones are thrown in
  posts.sort(sortPostsUpload)
  
  // Create the element that we're going to use to show each post
  let blogContainer = document.getElementById('blog-container')
  let blogElements = blogContainer.children
  for(let i = 0; i < posts.length; i++){
    let blogElement = blogElements[i]
    let post = posts[i]

    // Clear temp text
    blogElement.innerText = ''

    // Create an anchor tag with link to post
    let a = document.createElement('a')
    a.href = BASE_DOMAIN + post.slug
    a.target = '_blank'
    a.classList = 'blog-link'
    a.draggable = false
    blogElement.appendChild(a)
  
    // Image for the post
    let img = document.createElement('img')
    img.src = post.coverImage
    img.style = 'object-fit: contain; width: 100%;'
    img.draggable = false
    img.classList = 'blog-img'
    a.appendChild(img)

    // Add the title
    let header = document.createElement('h4')
    header.innerText = post.title
    a.appendChild(header)

    // Add brief subtext
    let brief = document.createElement('div')
    brief.innerText = post.brief
    a.appendChild(brief)
  }
  
}

ApplyData()