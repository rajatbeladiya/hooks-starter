import React, { useState, useEffect, useRef, createContext, useMemo } from 'react';
import Toggle from './Toggle';
import Counter from './Counter';
import { useTitleInput } from './hooks/hooks'

export const UserContext = createContext();

const App = () => {
  const [name, setName] = useTitleInput('');
  const ref = useRef();
  const [dishes, setDishes] = useState([]);

  const reverseWord = word => {
    return word
      .split('')
      .reverse()
      .join('')
  }

  const title = 'React Hooks';
  const reverseTitle = useMemo(() => reverseWord(name), [name]);


  const fetchDishes = async () => {
    const res = await fetch('https://my-json-server.typicode.com/leveluptuts/fakeapi/dishes')
    const data = await res.json();
    setDishes(data)
  }

  useEffect(() => {
    fetchDishes();
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: true
      }}
    >
      <div className="main-wrapper" ref={ref}>
        <h1 onClick={() => {
          ref.current.classList.add('new-test-class');
        }}>
          {title}</h1>
        <Toggle />
        <Counter />
        <form onSubmit={e => {
          e.preventDefault();
        }}>
          <h3>{reverseTitle}</h3>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <button>Submit</button>
        </form>

        {dishes.map((dish, index) =>
          (
            <article className="dish-card dish-card--withImage" key={index}>
              <h3>{dish.name}</h3>
              <p>{dish.desc}</p>
              <div className="ingredients">
                {dish.ingredients.map((ingredient, index) => (
                  <span key={index}> {ingredient}</span>
                ))}
              </div>
            </article>
          )
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
