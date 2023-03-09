import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState<any>({});
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);


    useEffect(() => {
        if (query !== '') {
            search();
        }

    }, [page]);


    const search = () => {
        if (query === '') {
            return;
        }

        const url = `https://pixabay.com/api/?key=10728786-22fcb3fafa93e4468a41cb577&q=${query}&image_type=photo&per_page=6&page=${page}`;

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setItems(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const changePage = (direction: string) => {
        if (direction === 'next') {
            setPage(page + 1);
        } else {
            if (page > 1) {
                setPage(page - 1);
            }
        }
        console.log(page);
    }


    return (
        <div className="App">
            <div className='header-container'>
                <input type='text' value={query} onChange={handleChange}/>
                <button onClick={() => search()} style={ {marginLeft: '20px'}}>Search</button>
            </div>
            <div className='list-container'>
                {items.hits && items.hits.map((item: any) => (
                    <a key={item.id} className='list-item' href={item.largeImageURL}>
                        <img src={item.largeImageURL} alt=''/>
                    </a>
                ))}
            </div>
            {items && items.totalHits > 6 && (<div className='pagination-container'>
                <button disabled={page === 1} onClick={() => changePage('prev')}>Prev</button>
                <button onClick={() => changePage('next')} style={ {marginLeft: '20px'}} >Next</button>
            </div>)}
        </div>
    );

}

export default App;
