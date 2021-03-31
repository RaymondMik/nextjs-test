import { useState, useEffect } from "react"
import useSWR from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()

  let locations = [];

  for (let key in allPostsData) {
     if (allPostsData.hasOwnProperty(key)) {
        locations.push({ _id: key, ...allPostsData[key] });
     }
  }

  return {
    props: {
      allPostsData: locations
    }
  }
}

// export async function getServerSideProps(context) {
//   const allPostsData = await getSortedPostsData()
//   console.log(333, allPostsData, context);

//   let locations = [];

//   for (let key in allPostsData) {
//      if (allPostsData.hasOwnProperty(key)) {
//         locations.push({ _id: key, ...allPostsData[key] });
//      }
//   }

//   return {
//     props: {
//       allPostsData: locations
//     }
//   }
// }

export default function Home ({ allPostsData }) {
  const [name, setName] = useState("Ramon")
  // const { data, error } = useSWR('https://rn-locations-default-rtdb.europe-west1.firebasedatabase.app/locations.json', fetch)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <button onClick={() => { setName("Billo")}}>change name</button>
      <section className={utilStyles.headingMd}>
        <p>{name}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }, i) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}