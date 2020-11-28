import './App.css';
import Form from './Form';

function App() {
  return (
    <div className="container">
      <h4 className="py-3">
        <strong>
          Create Order
        </strong>
      </h4>
      <div className="card">
        <div className="card-body">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
