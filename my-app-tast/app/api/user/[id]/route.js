export async function GET(request, { params }) {
  const { id } = await params;
  console.log("GET request received at /api/user/" + id);
  return Response.json({
    id: id,
    user: "Tada Thong-on"
  });
}
