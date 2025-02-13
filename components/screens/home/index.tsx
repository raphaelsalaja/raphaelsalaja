import { Posts } from '@/components/posts'

import styles from './styles.module.scss'
import Button from '@/components/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
        <div className={styles.logo} />
        <div className={styles.socials}>
          <Button asChild variant='ghost'>
            <a href='https://x.com/raphaelsalaja' target='_blank' rel='noopener noreferrer'>
              Twitter
            </a>
          </Button>
          <span>―</span>
          <Button asChild variant='ghost'>
            <a href='https://github.com/raphaelsalaja' target='_blank' rel='noopener noreferrer'>
              GitHub
            </a>
          </Button>
          <span>—</span>
          <Button asChild variant='ghost'>
            <a href='https://zora.co/@raphaelsalaja' target='_blank' rel='noopener noreferrer'>
              Zora
            </a>
          </Button>
          <span>—</span>
          <Button asChild variant='ghost'>
            <a href='mailto:raphaelsalaja@gmail.com' target='_blank' rel='noopener noreferrer'>
              Email
            </a>
          </Button>
        </div>
      </div>

      <div className={styles.bio}>
        <div className={styles.name}>
          <h1>Raphael Salaja</h1>
          <span>—</span>
          <h1>Design Engineer</h1>
        </div>
        <div className={styles.about}>
          <p>
            I’m someone who loves mixing different influences, genres and styles to create unique, innovative work. I
            enjoy pushing boundaries and exploring new ways to express myself without limitations.
          </p>
        </div>
      </div>

      <Posts category='projects' />
      <Posts category='engineering' />

      <div className={styles.footer}>
        <div className={styles.copyright}>
          <p className={styles.legal}>© 2025 Raphael Salaja</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h1>About</h1>
            <Button asChild variant='ghost'>
              <Link href='/'>Projects</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Scrapbook</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Engineering</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Archive</Link>
            </Button>
          </div>
          <div className={styles.column}>
            <h1>Connect</h1>
            <Button asChild variant='ghost'>
              <Link href='/'>Twitter</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>GitHub</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Zora</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Email</Link>
            </Button>
          </div>
          <div className={styles.column}>
            <h1>Website</h1>
            <Button asChild variant='ghost'>
              <Link href='/'>Colophon</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>Source</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
