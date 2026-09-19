import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
      {/* Додано className={css.headerLink} */}
      <Link href="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>
      
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {/* Додано className={css.navigationItem} */}
          <li className={css.navigationItem}>
            {/* Додано className={css.navigationLink} */}
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink}>
              Notes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;