import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    let completed = false;
    if(!search) return;
    const fetchData = async () => {
      const result = await axios.get(`/api/search?q=${search}`);
      if(completed) return;
      const { data } = result;
      const items = [];
      let count = 0;
      for(let e of data) {
        if(count++ > 5) break;
        items.push({no: count, ...e});
      }
      setData(items);
    }
    fetchData();
    return () => {
      completed = true;
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <input 
          className={styles.search} 
          type="text" 
          onChange={(e) => {
            setSearch(e.target.value);
          }} 
          placeholder="검색어를 입력하세요"
        />
        {
          data && data.length > 0 && (
            <div className={styles.resultBox}>
              {
                data.map((item) => {
                  console.log(item.no);
                  return (
                    <div 
                      className={styles.searchNode}
                      key={item.no}
                      onClick={() => {
                        let childWindow = window.open(`https://youtu.be/${item.videoId}`, '', 'fullscreen');
                        childWindow.addEventListener("load", () => {
                          const childDocument = childWindow.document;
                          const childBody = childDocument.body;
                          console.log(childBody);
                          childBody.style.backgroundColor = "red";
                        })
                      }}
                    >
                      <p className={styles.searchTitle}>{item.title} - {item.artist}</p>
                      <p className={styles.searchConte}>https://youtu.be/{item.videoId}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </main>
    </>
  )
}

export default Home;