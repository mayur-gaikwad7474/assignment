import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [content, setcontent] = useState("")
  const [tags, settags] = useState("")
  const [slug, setslug] = useState("")
  const [file, setfile] = useState("")
  const [id, setid] = useState(null)
  const [arrayOfPost, setarrayOfPost] = useState([])

  const getFile = (e) => {
    setfile(e.target.files[0])
  }

  const addHashTag = (e) => {
    settags(e.target.value)
  }

  const uploadPost = () => {
    if (content === "" || tags === "" || slug === "" || file === "") return alert("plz fill all fields")
    const data = {
      id: Date.now(),
      content: content,
      resource: {
        url: slug,
        tags: tags,
        fileData: file,
        file: "http://image.com/" + file.name,
      }
    }
    setarrayOfPost((prev) => [...prev, data])
  }


  const editPost = (data) => {
    setcontent(data.content)
    setslug(data.resource.url)
    settags(data.resource.tags)
    setid(data.id)
    setfile(data.resource.fileData)
    document.getElementById("file").value = ""
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
          <input id="file" type="file" onChange={(e) => getFile(e)} />
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
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
