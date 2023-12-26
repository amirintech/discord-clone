export default async function ServerIdPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return <div>SERVER ID: {id}</div>
}
