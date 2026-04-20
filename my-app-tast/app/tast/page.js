'use client';
import { useState, useEffect } from "react";
import { submitForm } from "./action";  

const BASE_URL = 'https://69e5f0f0ce4e908a155eb195.mockapi.io';

async function getBlogs() {
  const res = await fetch(`${BASE_URL}/blogs`);
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
}

export default function Page() {
  const [blogList, setBlogList] = useState([]);

  async function Loading(){
    const data = await getBlogs();
    setBlogList(data);
  }
  useEffect(() => {Loading();}, []);

   return (
    <>
      <div>Content page</div>

      {blogList.map((b, key) => (
        <div key={key}>
          <h2>{key} : {b.name}</h2>
        </div>
      ))}

      <form action={submitForm}>
        <input name="email" className="border p-2" placeholder="Enter email" />
        <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
      </form>
    </>
  );
}
