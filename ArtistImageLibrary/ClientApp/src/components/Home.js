import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Artist Image Library</h1>
        <p>Welcome to our gallery. Here, you can:</p>
        <ul>
          <li>Upload images you want to keep</li>
          <li>Check them anytime</li>
          <li>Delete the images you don't need anymore</li>
        </ul>
        <p>To get started, just go to the gallery page on the navigation bar.</p>
      </div>
    );
  }
}
