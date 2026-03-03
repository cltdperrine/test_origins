import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import VideoDetail from './pages/VideoDetail';
import Header from './components/layout/Header';


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles/:slug' element={<ArticleDetail />} />
        <Route path='/videos/:slug' element={<VideoDetail />} />
      </Routes>
    </>
  )
}

export default App
