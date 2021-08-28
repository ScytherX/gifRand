

export default function gift() {
    const [gifs, setGifs] = useState([]);
    const [term, updateTerm] = useState('');
  
    async function rand() {
      const API_KEY = '65jZnv6AH1NT4prsWeg7msk7OYuBhxHO';
      try {
        const Rand_URL = 'http://api.giphy.com/v1/gifs/random';
        const resJson = await fetch(`${Rand_URL}?api_key=${API_KEY}&limit=1`);
        const res = await resJson.json();
        setGifs(res.data);
      } catch (error) {
        console.warn(error);
      }
    }
  
    async function fetchGifs() {
      const API_KEY = '65jZnv6AH1NT4prsWeg7msk7OYuBhxHO';
      try {
        const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
        const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=1`);
        const res = await resJson.json();
        setGifs(res.data);
      } catch (error) {
        console.warn(error);
      }
    }
  
    function onEdit(newTerm) {
      updateTerm(newTerm);
      fetchGifs();
    }
}