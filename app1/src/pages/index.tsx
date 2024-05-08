import RevalidateComponent from "@/components/revalidateComponent";
import useDitto from "@/hooks/useDitto";

export default function Home() {
  const { data } = useDitto();

  console.log(data)

  return <RevalidateComponent />
}
