import React from "react";
import Heading from "../components/extras/Heading";
import { Link } from "react-router-dom";

// RawProductPage.js
function RawProductPage() {
  const cards = [
    {
      title: "List Raw Products",
      link: "/rawproducts/list",
      description: "View a list of raw products.",
    },
    {
      title: "Create Raw Product",
      link: "/rawproducts/create",
      description: "Create a new raw product.",
    },
    {
      title: "Update Raw Products",
      link: "/rawproducts/update",
      description: "Update existing raw products.",
    },
  ];

  return (
    <>
      <div className="mx-auto mb-4">
        <Heading heading="Raw Product Page"></Heading>
      </div>
      <div className="flex flex-row justify-center space-x-6">
        {cards.map((card, index) => (
          <Link key={index} to={card.link}>
            <div className="max-w-sm rounded mx-9 overflow-hidden shadow-lg bg-white border border-gray-300 transition transform hover:scale-105">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
                <p className="text-gray-700 text-base">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default RawProductPage;
