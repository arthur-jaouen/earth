import { FunctionComponent } from 'react'
import { useAuthorEntities } from '../model'
import { Link } from '../ui/Link'
import { AuthorAbout } from './authors/AuthorAbout'

import './About.scss'

export const About: FunctionComponent = () => (
  <div className="about">
    <h2>Contact</h2>
    <p>
      You can contact me at this address:&nbsp;
      <Link href="mailto:arthur.jaouen@gmail.com">arthur.jaouen@gmail.com</Link>
    </p>
    <p>
      The source code is available on Github:&nbsp;
      <Link href="https://github.com/arthur-jaouen/earth">
        https://github.com/arthur-jaouen/earth
      </Link>
    </p>
    <h2>Roadmap</h2>
    <ul>
      <li>Add image/timeline details</li>
      <li>Add dashboard + favorites</li>
      <li>Add search</li>
      <li>Add more data</li>
    </ul>
    <h2>Sources</h2>
    {useAuthorEntities().map((entity) => (
      <AuthorAbout key={entity.id} entity={entity} />
    ))}
  </div>
)
