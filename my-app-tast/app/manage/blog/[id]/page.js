'use client'
import { useState, useEffect, use } from "react";
import axios from "axios";

const BASE_URL = 'https://69e5f0f0ce4e908a155eb195.mockapi.io';

export default function Page({ params }) {
  const { id } = use(params);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Blogname, setNewName] = useState("");

  async function fetchBlog() {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/${id}`);
      setBlog(res.data);
      setNewName(res.data.name);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/blogs/${id}`, {
        name: Blogname,
        description: blog.description
      });

      if (res.status === 200) {
        alert("successfully: " + Blogname);
        fetchBlog();
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Fali");
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
            placeholder="new name"
            className="border p-1"
          />
        </div>
        <button type="submit" className="px-4 bg-gray-600 text-white mt-2">Submit</button>
      </form>
    </>
  );
}
