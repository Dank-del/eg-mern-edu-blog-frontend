export default async function getMe(token) {
  const req = await fetch('https://edu-blog-api.sayan.org.in/api/accounts/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });

  if (req.status === 200) {
    return await req.json();
  }

  return null;
}
