import { useFirestore } from '~/lib/firebase';
import { Head } from '~/components/shared/Head';
import { useEffect, useState } from 'react';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '~/components/button';
import Input from '~/components/input';

export type Tool = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export enum InputEnum {
  Id = 'id',
  Title = 'title',
  Description = 'description',
  Url = 'url',
}

function Index() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [inputData, setInputData] = useState<Partial<Tool>>({
    title: '',
    description: '',
    url: '',
  });
  const [formError, setFormError] = useState<boolean>(false);
  const firestore = useFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toolsCollection = collection(firestore, 'tools');
        const toolsQuery = query(toolsCollection);
        const querySnapshot = await getDocs(toolsQuery);
        const fetchedData: Tool[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() } as Tool);
        });
        setTools(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: InputEnum, value: string) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const toolsCollection = collection(firestore, 'tools');

      const newTool: Partial<Tool> = {
        title: inputData.title,
        description: inputData.description,
        url: inputData.url,
      };

      await addDoc(toolsCollection, newTool);

      setTools([...tools, newTool]);      
      setInputData({
        title: '',
        description: '',
        url: '',
      });

      toast.success('Saved the tool succesfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <>
      <Head title="TOP PAGE" />
      <nav className="p-4 flex text-white bg-slate-800 items-center justify-between">
        <p className="text-3xl">
          Random <span className="text-purple-500 font-bold">List</span>
        </p>
      </nav>
      <div className="hero min-h-screen bg-slate-800 ">
        <div className="max-w-5xl mx-auto ">
          <form className="flex" onSubmit={handleFormSubmit}>
            <Input
              placeholder="Title"
              value={inputData.title}
              onChange={(e) => handleInputChange(InputEnum.Title, e.target.value)}
            />
            <Input
              placeholder="Description"
              value={inputData.description}
              onChange={(e) => handleInputChange(InputEnum.Description, e.target.value)}
            />
            <Input
              placeholder="URL"
              value={inputData.url}
              onChange={(e) => handleInputChange(InputEnum.Url, e.target.value)}
            />
            <Button children="Add new tool" />
          </form>
          <div className="grid grid-cols-4 gap-4 w-full bg-transparent text-slate-50">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="h-48 flex flex-col justify-between rounded-md shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700"
              >
                <div> 
                <div className="text-xl mb-2 font-bold">{tool.title}</div>
                <div className="">{tool.description}</div>
                </div>
                <a className="text-slate-400" href={tool.url}>{tool.url}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;
