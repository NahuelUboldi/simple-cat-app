import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [catFact, setCatFact] = useState<string>('');
  const [gifs, setGifs] = useState<Array<string>>([]);
  const [gifIndex, setGifIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRandomNum = (n: number) => Math.floor(Math.random() * n);

  const fetchCatFact = () => {
    fetch('https://catfact.ninja/fact')
      .then((r) => r.json())
      .then((r) => setCatFact(r.fact || 'cats are cute'))
      .catch((err) => console.log(err))
      .finally(() => console.log({ catFact }));
  };
  useEffect(() => {
    fetchCatFact();
  }, []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
    const firstThreeWords = catFact.split(' ', 3).join(' ');
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${firstThreeWords}&api_key=${apiKey}`
    )
      .then((r) => r.json())
      .then((r) => {
        const onlyUrls: Array<string> = [...r.data].map(
          (g) => g.images.original.url
        );
        setGifs(onlyUrls);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [catFact]);

  useEffect(() => {
    setGifIndex(getRandomNum(gifs.length));
  }, []);

  return (
    <>
      <header>
        <h1>Simple Cats App</h1>
      </header>
      <main>
        {isLoading ? (
          <article>Loading</article>
        ) : (
          <article>
            <header>
              <blockquote className='cat-frase'>
                <h3>FACT: </h3>
                <p>{catFact}</p>
              </blockquote>
              <div>
                <button
                  className='change-gif'
                  onClick={() => setGifIndex(getRandomNum(gifs.length))}
                >
                  Change Gif
                </button>

                <button className='change-gif' onClick={fetchCatFact}>
                  Change Fact
                </button>
              </div>
            </header>
            <img src={gifs[gifIndex]} alt='' />
          </article>
        )}
      </main>
    </>
  );
}

export default App;
