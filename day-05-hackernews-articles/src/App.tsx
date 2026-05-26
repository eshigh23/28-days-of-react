import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import type { AxiosResponse } from "axios"

interface Article {
  id: number
  title: string
  by: string
  url: string
  score: number
}

function App() {

  const [loading, setLoading] = useState(false)
  const [topArticles, setTopArticles] = useState<AxiosResponse<Article>[]>([])


  useEffect(() => {
    const fetchTopArticles = async () => {
      try {
        setLoading(true)

        // fetch top article item ids and slice to first 10
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        const topItemIds = response.data.slice(0, 10)

        // create promises array and fetch the articles data
        const promises = topItemIds.map((articleId : number) => (
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json?print=pretty`)
        ))

        const articlesResponse = await Promise.all(promises)
        setTopArticles(articlesResponse)

      } catch (e) {
        console.error(e)

      } finally {
        setLoading(false)
      }

    }
    fetchTopArticles()
  }, [])



  return ( 
    <div className="app">
      <h3>Hacker News Top Articles</h3>

      { loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="app--list">
          { topArticles.map(article => (
            <li key={article.data.id}>
              <a href={article.data.url}>{article.data.title}</a>
              <p>{article.data.score} by {article.data.by}</p>
            </li>
          ))}
      </ul>
      )}

    </div>
  )
}

export default App
