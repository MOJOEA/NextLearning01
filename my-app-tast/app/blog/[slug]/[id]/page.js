export default async function Page({ params }) {
  const { slug, id } = await params; 
  return (
    <div>
      <h1>Content page: {slug}</h1>
      <p>ID: {id}</p>
    </div>
  );
}
