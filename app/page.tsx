
import Map from "./componentes/Map";
import { getEdificiosList } from "./services/edificios-menu";
import { getRecursoList } from "./services/recursos";
export default async function Home() {
  const recursosData = await getRecursoList();
  const edificiosData = await getEdificiosList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Map recursos={recursosData} edificios={edificiosData} ></Map>
    </main>
  );
}
