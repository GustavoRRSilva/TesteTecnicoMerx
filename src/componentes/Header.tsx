import style from "@/styles/Header.module.scss";
export default function Header() {return(
    <header className={style.header}>
        <ul>
            <li><h1>M-API</h1></li>
            <li><img src= "https://cdn-icons-png.flaticon.com/128/2234/2234489.png" alt= "Shield American cap" /></li>
        </ul>
    </header>
)}