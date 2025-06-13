import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import './App.css';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

function App() {
  return (
    <Router>
      <Navbar key={localStorage.getItem('username')} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />

      </Routes>
    </Router>
  );
}

export default App;
