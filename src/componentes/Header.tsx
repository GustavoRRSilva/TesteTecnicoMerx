import Image from "next/image";
import style from "@/styles/Header.module.scss";
export default function Header() {return(
    <header className={style.header}>
        <ul>
            <li><h1>M-API</h1></li>
            <li><img src="shield.png" alt="Shield American cap" /></li>
        </ul>
    </header>
)}