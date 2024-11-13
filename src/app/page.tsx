export default async function Home() {
  const response = await fetch("http://localhost:3000/api/v1/database/users", {
    method: "POST",
    body: JSON.stringify({
      name: "thing",
      email: "damn",
    }),
  });
  console.log(await response.json());
  return <p>Hello world!</p>;
}
