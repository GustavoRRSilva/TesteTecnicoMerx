"use client";
import Image from "next/image";
import { useState } from "react";
import HeroList from "../componentes/ListHeroes";
import style from "@/styles/Page.module.scss";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className={style.main}>
      <img src="banner.png" alt="Marvel banner" className={style.img} />
      <div className={style.titleDiv}>
        <h1>Marvel Characters</h1>
        <span></span>
      </div>
      <HeroList currentPage={currentPage} />

      <ul className={style.options}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
          <li
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? style.active : ""}
          >
            {page}
          </li>
        ))}
      </ul>
    </main>
  );
}
