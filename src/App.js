import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [content, setcontent] = useState("")
  const [tags, settags] = useState("")
  const [slug, setslug] = useState("")
  const [file, setfile] = useState("")
  const [fileURL, setfileURL] = useState("")
  const [id, setid] = useState(null)
  const [arrayOfPost, setarrayOfPost] = useState([])

  const getFile = (e) => {
    setfile(e.target.files[0])
    const reader = new FileReader();
    reader.onload = function () {
      setfileURL(reader.result)
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const addHashTag = (e) => {
    settags(e.target.value)
  }

  const uploadPost = () => {
    if (content === "" || tags === "" || slug === "" || file === "") return alert("plz fill all fields")
    let type = file.type
    type = type.substring(0, 5)
    console.log(type)
    if (id !== null) {
      const updatedArray = arrayOfPost.map(data => {
        if (data.id === id) {
          data.content = content
          data.resource.url = slug
          data.resource.tags = tags
          data.resource.fileData = file
          data.resource.type = type
          data.resource.file = "http://image.com/" + file.name
          data.resource.fileURL = fileURL
          return data
        } else {
          return data
        }
      })
      setid(null)
      setarrayOfPost(updatedArray)
    } else {
      const data = {
        id: Date.now(),
        content: content,
        resource: {
          url: slug,
          tags: tags,
          fileData: file,
          type: type,
          file: "http://image.com/" + file.name,
          fileURL: fileURL
        }
      }
      setarrayOfPost((prev) => [...prev, data])
    }
    setcontent("")
    setslug("")
    settags("")
    setfile("")
    document.getElementById("file").value = ""
  }


  const editPost = (data) => {
    setcontent(data.content)
    setslug(data.resource.url)
    settags(data.resource.tags)
    setid(data.id)
    setfile(data.resource.fileData)
  }

  return (
    <div className="container">
      <div className="editor-container">
        <div className="input-container">
          <label>Content</label>
          <input value={content} type="text" placeholder="your content"
            onChange={(e) => setcontent(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Add URL</label>
          <input value={slug} type="text" placeholder="url"
            onChange={(e) => setslug(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Tag</label>
          <input value={tags} type="text" className="tags" placeholder="#tags"
            onChange={(e) => addHashTag(e)}
          />
        </div>
        <div>
          <input id="file" type="file" accept="image/*, video/*" onChange={(e) => getFile(e)} />
        </div>
        <button onClick={uploadPost}>Upload</button>
      </div>
      <div className="posts">
        {
          arrayOfPost.map(data => {
            return <div key={data.id} className="card" onClick={() => editPost(data)}>
              <div className="edit">✎</div>
              <div>Content : {data.content}</div>
              <div>URL : {data.resource.url}</div>
              <div>Tags : <span style={{ color: 'blue' }} >{data.resource.tags}</span></div>
              <div>File URL : {data.resource.file} </div>
              {
                data.resource.type === "image" ? <img src={data.resource.fileURL} alt="" /> :
                  <video width="150" height="150" controls>
                    <source src={data.resource.fileURL} type="video/mp4" />
                  </video>
              }
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
