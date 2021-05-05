import { useState } from 'react'

const Search = ({setSearchWords}) => {
    const [curInput, setCurInput] = useState("")
    return (
        <div className="searchBar" >
            <input 
                type="text"
                placeholder={"Search Movies"}
                onChange={(e) => setCurInput(e.target.value)}
            />
            <button disabled={curInput.length <= 2} 
            onClick={() => setSearchWords(curInput)}>Search!</button>
        </div>
    )
}

export default Search
