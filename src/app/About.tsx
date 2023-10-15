import { Fragment, FunctionComponent } from 'react';

import { authors } from '../model/AuthorModel';
import { sources } from '../model/SourceModel';
import './About.scss';

export const About: FunctionComponent = () => (
  <div className="about">
    <h2>Contact</h2>
    <p>
      You can contact me at this address:&nbsp;
      <a href="mailto:arthur.jaouen@gmail.com" target="_blank" rel="noreferrer">
        arthur.jaouen@gmail.com
      </a>
    </p>
    <p>
      The source code is available on Github:&nbsp;
      <a href="https://github.com/arthur-jaouen/earth" target="_blank" rel="noreferrer">
        https://github.com/arthur-jaouen/earth
      </a>
    </p>
    <h2>Roadmap</h2>
    <ul>
      <li>Add image/timeline details</li>
      <li>Add dashboard + favorites</li>
      <li>Add search</li>
      <li>Add more data</li>
    </ul>
    <h2>Sources</h2>
    {Object.entries(authors).map(([key, author]) => (
      <Fragment key={key}>
        <h3>{author.name}</h3>
        <p>
          <a href={author.website} target="_blank" rel="noreferrer">
            Website
          </a>
          &nbsp;
          {author.description}
        </p>
        {Object.entries(sources)
          .filter(([, source]) => source.author === key)
          .map(([key, source]) => (
            <p key={key}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.url}
              </a>
            </p>
          ))}
      </Fragment>
    ))}
  </div>
);
