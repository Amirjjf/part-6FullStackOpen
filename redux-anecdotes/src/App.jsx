import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import { useQuery } from "@tanstack/react-query";
import noteService from "./services/requests.js";

const App = () => {
  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: noteService.getAll,
    retry: false,
  });

  if (isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (isError) {
    return (
      <div>Error loading anecdotes. Problem connecting to the server.</div>
    );
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
