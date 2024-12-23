// I can create the global config file
const API_URL: string = "URL";

const fetchData = async (url: string) => {
   try{
        const response = await fetch(`${API_URL}${url}`);
        if(!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data;
   }
   catch(error){
      console.error('Error:', error);
      throw error;
   }
}

const fetchUserById = async (id: number) => {
    return fetchData(`/api/users/${id}`);
  };
  
  const fetchPostById = async (id: number) => {
    return fetchData(`/api/posts/${id}`);
  };

