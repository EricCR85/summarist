"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchBook() {
            const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
            const data = await response.json();
            setBook(data);
            
        }
        fetchBook();
    }, [id]);

    if (!book) return <p>Loading book details...</p> 

    return (
        <div className="book-details-container">
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <img src={book.imageLink} alt={book.title} style={{ width: '200px' }} />
            <p>{book.summary}</p>
        </div>
    )

}