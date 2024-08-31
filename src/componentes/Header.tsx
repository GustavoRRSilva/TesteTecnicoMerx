import style from "@/styles/Header.module.scss";
import Link from "next/link";
export default function Header() {
  return (
    <header className={style.header}>
      <ul>
        <li>
          <Link href="/">
            <h1>M-API</h1>{" "}
          </Link>
        </li>
        <li>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2234/2234489.png"
            alt="Shield American cap"
          />
        </li>
      </ul>
    </header>
  );
}
