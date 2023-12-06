import React, { useEffect, useRef, useState } from 'react'
import styles from '../src/styles/login.module.css'
import Image from 'next/image'

const Search = () => {
    const [data, setData] = useState(null)
    const searchInputRef = useRef(null);

/*     useEffect(() => {
        var input = document.getElementById("myInput");

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                input.search();
            }
        });
    }, []) */


    async function search(e) {
        e.preventDefault();
        const term = searchInputRef.current.value;
        console.log(term)
        if (!term) return;
        else {
            const staticData = await fetch(`https://dummyjson.com/products/search?q=${term}`).then(res => res.json())
            setData(staticData);
        }
    }

    return (
        <section>
            <div className={`container ${styles.main}`}>
                <div className={`row ${styles.cardlog}`}>
                    <div className={styles.contenedorPrincipal}>
                        <div className={styles.busqueda}>
                            <div onClick={search}>
                                <Image src={require('@/public/image/Search.png')}
                                    width={26}
                                    height={26} />
                            </div>
                            <input type='text' ref={searchInputRef} className={styles.caja} onClick={search} id='myInput'></input>
                        </div>
                    </div>
                    <div>
                        {data !== null && (data.products.map((datos) => (
                            <div key={datos.id} className={styles.card}>
                                <img src={datos.images[0]} />
                                <p>nombre: {datos.title}</p>
                                <p>Marca: {datos.brand}</p>
                                <p>categoría: {datos.category}</p>
                                <p>descripción: {datos.description}</p>
                                <p>precio: {datos.price}</p>
                            </div>
                        ))
                        )}</div>
                </div>
            </div>
        </section>

    )
}

export default Search