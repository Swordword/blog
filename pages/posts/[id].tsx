import React, { useContext } from 'react'
// import Link from "next/link";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import utilStyles from "../../styles/utils.module.css";

import { ThemeContext } from '../../config/theme'


export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article style={{
        background: theme.background,
        color: theme.foreground,
      }}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}
