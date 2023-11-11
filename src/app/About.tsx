import { Fragment, FunctionComponent } from 'react'
import { Authors } from '../authors/AuthorTable'
import { Link } from '../lib/Link'
import { Sources } from '../sources/SourceTable'

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
    {Authors.entries().map(([key, author]) => (
      <Fragment key={key}>
        <h3>{author.name}</h3>
        <p>
          <Link href={author.website}>Website</Link>
          &nbsp;
          {author.description}
        </p>
        {Sources.entries()
          .filter(([, source]) => source.author === key)
          .map(([key, source]) => (
            <p key={key}>
              <Link href={source.url}>{source.url}</Link>
            </p>
          ))}
      </Fragment>
    ))}
  </div>
)
