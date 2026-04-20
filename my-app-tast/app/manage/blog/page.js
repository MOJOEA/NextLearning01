import { headers } from 'next/headers'
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
    const headerList = await headers()
    const userData = headerList.get('user')
    const user = userData ? JSON.parse(userData) : null 

    const blogs = await getBlogs()

    return (
        <>
        <div>
            <h1>Manage Blog</h1>
            {user ? (
                <p>Welcome: {user.email}</p>
            ) : (
                <p>No user data found</p>
            )}
        </div>
            {blogs.map((b, key) => (
        <div key={key}>
          <h2>{key} : {b.name}</h2>
          <Link href={`/manage/blog/${b.id}`} className="px-4 bg-gray-600"> 
            Edit Blog... 
          </Link>
        </div>
      ))}
      </>
    )
}
