import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [catFact, setCatFact] = useState<string>('');
  const [gifs, setGifs] = useState<Array<string>>([]);

  const fetchCatFactData = async () => {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    setCatFact(data?.fact || 'cat');
  };

  const firstThreeWords = catFact.split(' ', 3).join(' ');
  const fetchGiphyGif = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        import.meta.env.VITE_GIPHY_API_KEY
      }&q=${firstThreeWords}`
    );
    const data = await response.json();

    console.log(data);
    const onlyGifsUrl: Array<string> = [...data.data].map(
      (g) => g?.images?.original.url
    );

    setGifs(onlyGifsUrl);
  };

  // const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

  useEffect(() => {
    fetchCatFactData();
  }, []);
  useEffect(() => {
    fetchGiphyGif();
  }, []);

  return (
    <>
      <header>
        <h1>Simple Cats App</h1>
      </header>
      <main>
        <article>
          <div className='cat-frase'>{catFact}</div>
          <img src={gifs[0]} alt='' />
        </article>
      </main>
    </>
  );
}

export default App;
