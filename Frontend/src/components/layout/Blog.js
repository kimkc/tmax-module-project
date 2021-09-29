import React from 'react';
import BlogTitle from '../elements/UI/BlogTitle';
import BlogContents from '../elements/widgets/blog/BlogContents';

export default function Blog() {
  return(
    <section id="blog">
      <div className="container">
        <BlogTitle title="Today's Blog"></BlogTitle>
        <BlogContents></BlogContents>
      </div>
    </section>
  );
}