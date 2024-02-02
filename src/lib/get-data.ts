const endPoint = `http://localhost:10018/wp-json/wp/v2/`
const postsEndpoint = "http://localhost:10018/wp-json/wp/v2/posts";

export async function getPosts() {
  const res = await fetch(`${endPoint}posts`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getUser(id: number) {
  const res = await fetch(`${endPoint}users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getCategory(id: number) {
  const res = await fetch(
    `${endPoint}categories/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAllCategories(ids: Array<number>) {
  const res = await Promise.all(ids.map((id) => getCategory(id)));

  return res;
}
