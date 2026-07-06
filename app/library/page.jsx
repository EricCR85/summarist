"use client";
import React from "react";
import { useLibrary } from "../../hooks/useLibrary";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";

const FINISHED_BOOKS = [
  {
    id: 1,
    title: "How to Talk to Anyone",
    author: "Leil Lowndes",
    imageLink: "https://summarist.vercel.app/books/1.png",
  },
  {
    id: 2,
    title: "Can't Hurt Me",
    author: "David Goggins",
    imageLink: "https://summarist.vercel.app/books/2.png",
  },
  {
    id: 3,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    imageLink: "https://summarist.vercel.app/books/3.png",
  },
  {
    id: 4,
    title: "Mastery",
    author: "Robert Greene",
    imageLink: "https://summarist.vercel.app/books/4.png",
  },
  {
    id: 5,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    imageLink: "https://summarist.vercel.app/books/5.png",
  },
];

export default function LibraryPage() {
  const { library, loading, removeFromLibrary } = useLibrary();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl animate-pulse">Loading your collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
        <div className="w-full max-w-xs">
          <SearchBar />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Saved Books</h2>
      {library && library.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {library.map((book) => (
            <div
              key={book.bookId || book.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={book.imageLink || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold truncate">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <button
                  onClick={() => removeFromLibrary(book.bookId || book.id)}
                  className="mt-3 text-red-500 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center border-2 border-dashed mb-12">
          <p className="text-gray-500">
            Save your favorite books! When you save a book, it will appear here.
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Finished</h2>
      <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
        {FINISHED_BOOKS.map((book) => (
          <div
            key={book.id}
            className="min-w-[200px] w-[200px] border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
          >
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <div className="p-4">
              <h2 className="text-md font-bold truncate">{book.title}</h2>
              <p className="text-xs text-gray-600">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}









// "use client";
// import React from "react";
// import { useLibrary } from "../../hooks/useLibrary";
// import SearchBar from "../../components/SearchBar";
// import Link from "next/link";

// export default function LibraryPage() {
//   const { library, loading, removeFromLibrary } = useLibrary();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl animate-pulse">Loading your collection...</p>
//       </div>
//     );
//   }

//   if (library.length === 0) {
//     return (
//       <div className="p-10 text-center">
//         <h1 className="text-3xl font-bold mb-4">My Library</h1>
//         <p className="text-gray-500">Save your favorite books! When you save a book, it will appear here.</p>
//       </div>
//     );
//   }

//   return (
//       <div className="bg-white min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-4">
//         <h1 className="text-xl font-bold text-gray-800">For You</h1>
//         <div className="w-full max-w-xs">
//           <SearchBar />
//         </div>
//       </div>

//       <h1 className="text-3xl font-bold mb-8">My Library</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {library.map(
//           (book, index) => (
//             console.log(book),
//             (
//               <Link
//                 href={`/books/${book.bookId || book.id}`}
//                 key={book.id}
//                 className="block cursor-pointer hover:shadow-lg transition-shadow rounded-lg overflow-hidden border"
//               >
//                 <img
//                   src={
//                     book.imageLink ||
//                     "https://via.placeholder.com/150?text=No+Image"
//                   }
//                   alt={book.title}
//                   className="w-full h-48 object-cover mb-4 rounded"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/150?text=No+Image";
//                   }}
//                 />
//                 <h2 className="text-lg font-bold">{book.title}</h2>
//                 <p className="text-sm text-gray-600">{book.author}</p>
//                 <button
//                   onClick={() => removeFromLibrary(book.id)}
//                   className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Remove
//                 </button>
//               </Link>
//             )
//           ),
//         )}
//       </div>
//       </div>
//   );
// }
