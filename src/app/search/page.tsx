export default function Search({
  searchParams
}: {
  searchParams: { q: string }
}) {
  return <div>{searchParams.q}</div>
}
