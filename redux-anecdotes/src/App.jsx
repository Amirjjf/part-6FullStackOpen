import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx'; 

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList /> {/* ✅ Use the new component */}
      <AnecdoteForm />
    </div>
  );
};

export default App;
