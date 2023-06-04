import { useFirestore } from '~/lib/firebase';
import { Head } from '~/components/shared/Head';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { collection, query, getDocs } from 'firebase/firestore';

type Tool = {
  id: string,
  title: string,
  description: string,
  url: string,
}

function Index() {
  const { state } = useAuthState();
  const [tools, setTools] = useState<Array<Tool>>([]);
  const firestore = useFirestore()

  //GET THE DATA WHEN PAGE LOADS
  useEffect(() =>{
    async function fetchData() {
      const toolsColection = collection(firestore, "tools");
      const toolsQuery = query(toolsColection);
      const querySnapshot = await getDocs(toolsQuery)
      const fetchedData: Array<Tool> = []
      querySnapshot.forEach((doc) => {
        fetchedData.push({id: doc.id, ...doc.data()} as Tool);
      })
      setTools(fetchedData)
      console.log(fetchedData)
    }
    fetchData();
  }, [])
  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">

      </div>

    </>
  );
}

export default Index;
