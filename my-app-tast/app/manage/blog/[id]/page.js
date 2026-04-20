'use client'
import { useState, useEffect, use } from "react";

const BASE_URL = 'https://69e5f0f0ce4e908a155eb195.mockapi.io';

export default function Page({ params }) {
  const { id } = use(params);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Blogname, setNewName] = useState("");

  async function fetchBlog() {
      const res = await fetch(`${BASE_URL}/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog(data);
        setNewName(data.name);
      }
      setLoading(false);
    }
    
  useEffect(() => {
    fetchBlog();
  }, [id]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Blogname,
          description: blog.description
        })
      });

      if (res.ok) {
        alert("successfully: " + Blogname);
        fetchBlog();
      } else {
        alert("error");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("error502");
    }
  };


  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>404 Blog</div>;

  return (
    <>
      <div>
        <h1>Content page</h1>
      </div>
      <div>
        <h2>BlogName : {Blogname}</h2>
        <h2>Description : {blog.description}</h2>
      </div>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Edit name: </label>
          <input 
            type="text" 
            value={Blogname} 
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="พิมพ์ชื่อใหม่ที่นี่"
          />
        </div>
        <button type="submit" className="px-4 bg-gray-600">Submit</button>
      </form>
    </>
  );
}
