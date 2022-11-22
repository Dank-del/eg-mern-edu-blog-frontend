export default async function getPoster(id) {
  const data = await fetch(
    `https://edu-blog-api.sayan.org.in/api/accounts/user/${id}`,
    {
      method: 'GET',
    }
  );
  return await data.json();
}
