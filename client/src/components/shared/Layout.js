import React from 'react';
import { useLayoutStyles } from '../../styles/styles';
import SEO from './Seo';
import NavBar from './Navbar';

function Layout({ children, title, minimalNavbar, marginTop = 0 }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      <SEO title={title} />
      <NavBar minimalNavbar={minimalNavbar} />
      <main className={classes.main} style={{ marginTop }}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

export default Layout;
