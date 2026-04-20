import Link from 'next/link'

const BASE_URL = 'https://69e5f0f0ce4e908a155eb195.mockapi.io';

async function getBlogs() {
  const res = await fetch(`${BASE_URL}/blogs`);
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return res.json();
}

export default async function Page() {
  const blogs = await getBlogs();
  
  return (
    <>
      <div>
        Content page
      </div>
      {blogs.map((b, key) => (
        <div key={key}>
          <h2>{key} : {b.name}</h2>
          <Link href={`/blog/${b.id}`} className="px-4 bg-gray-600"> 
            read Blog... 
          </Link>
        </div>
      ))}
    </>);
}