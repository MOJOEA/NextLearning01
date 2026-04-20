const BASE_URL = 'https://69e5f0f0ce4e908a155eb195.mockapi.io';

async function getBlog(id) {
  const res = await fetch(`${BASE_URL}/blogs/${id}`); 
  if (!res.ok) throw new Error('ไม่พบข้อมูลบล็อกนี้');
  return res.json();
}


export default async function Page({ params }){
    const { id } = await params; 
    const blog = await getBlog(id)
    return (
        <>
        <div>
            ID: {id}
        </div>
        <div>
            Blog Name : {blog.name}
        </div>
        </>
    )
}
