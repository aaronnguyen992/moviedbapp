import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  // useEffect(() => {
  //   fetch('https://movies.sanctuary.computer/api/search?query=mad+max')
  //   .then(response => response.json())
  //   .then(json => setData(json))
  //   .catch(error => console.error(error))
  // }, [])

  const searchChange = (event) => {
    setSearch(event.target.value)

    if(search.length > 3){
      const searchTerm = search.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '+') // replace spaces with hyphens


      fetch(`https://movies.sanctuary.computer/api/search?query=${searchTerm}`)
      .then(response => response.json())
      .then(json => {
        setData(json.results)
      })
      .catch(error => console.error(error))
    }
  }

  const clearSearch = (event) => {
    console.log(search)
    setSearch('')
    setData('')
  }

  const selectMovie = (event) => {
    console.log(event.target.value)
    setSelectedOption(event.target.value)
    setSearch(event.target.value)
  }

  // const searchDb = () => {
  //   const searchTerm = search.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
  //   .trim() // trim leading or trailing whitespace
  //   .toLowerCase() // convert to lowercase
  //   .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
  //   .replace(/\s+/g, '+') // replace spaces with hyphens


  //   fetch(`https://movies.sanctuary.computer/api/search?query=${searchTerm}`)
  //   .then(response => response.json())
  //   .then(json => {
  //     setData(json.results)
  //   })
  //   .catch(error => console.error(error))
  // }

  return (
    <>
      <div>
        <input id="searchbar" onChange={searchChange} type="text" value={search} />
        {/* <button onClick={searchDb}>Search</button> */}
        <button onClick={clearSearch}>Clear</button>

        <div>
          {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading'} */}
          {selectedOption ? '' : (
            <div>
              <label htmlFor="dropdown">Movie Suggestions:</label>
              <select name="dropdown" id="dropdown">
              {data ? data.slice(0, 5).map((movie) => {
                return (
                  <option onChange={selectMovie} value={`${movie.title}(${movie.release_date.slice(0,4)})`}>{movie.title}({movie.release_date.slice(0,4)})</option>
                )
              }) : 'Loading'}
              </select>
            </div>
          )
          }
        </div>
      </div>
    </>
  )
}

export default App
