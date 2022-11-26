import './news.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NewsProps {}
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

const newsLoc = 'news';

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }

  const newsCacheDate = localStorage.getItem(newsLoc + 'Date');
  const newsCacheData = localStorage.getItem(newsLoc + 'Data');

  useEffect(() => {
    const curDate = new Date().getTime();
    debugger;
    if (newsCacheDate && newsCacheData && curDate < Number(newsCacheDate)) {
      setNews(JSON.parse(newsCacheData));
    } else {
      fetch('http://localhost:3333/api/news')
        .then(response => response.json())
        .then(news => {
          const sortedNews = sortNews(news);
          localStorage.setItem(newsLoc + 'Date', String(curDate + 60 * 60 * 1000));
          localStorage.setItem(newsLoc + 'Data', JSON.stringify(sortedNews));

          setNews(sortedNews);
        })
    }
  }, []);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {news.map(peaceOfNews => {
        return <li key={peaceOfNews.id}>
          <h2>{peaceOfNews.title}</h2>
          <p>{peaceOfNews.description}</p>
          <hr/>
        </li>
      })}
      </ul>
    </div>
  );
}

export default News;
