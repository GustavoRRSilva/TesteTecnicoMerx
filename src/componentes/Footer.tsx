import style from "@/styles/Footer.module.scss";
import Link from "next/link";
export default function Header() {
  return (
    <header className={style.footer}>
      <ul>
        <li>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2234/2234489.png"
            alt="Shield American cap"
          />
        </li>

        <li>
          <Link href="https://github.com/GustavoRRSilva/TesteTecnicoMerx/tree/main">
            <h1>Github</h1>
          </Link>
        </li>
      </ul>
    </header>
  );
}
