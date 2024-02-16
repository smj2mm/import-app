import { FC, useState, useEffect } from 'react';
import './App.css';
import Alert from 'react-bootstrap/Alert';
import CsvUploader from './components/CsvUploader';
import ProductTables from './components/ProductTables';


const App: FC = () => {
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  // This function will be passed to CsvUploader
  const handleDataRefresh = () => {
    setDataRefreshTrigger((prev) => prev + 1); // Increment to trigger a re-render
  };

  return (
    <div className="App">
      {error && <Alert variant="danger">{error}</Alert>}

      <h1>Canix Scales CSV Uploader</h1>
      <CsvUploader setError={setError} onDataUploadSuccess={handleDataRefresh} />
      {/* Pass dataRefreshTrigger as a key to force re-render when it changes */}
      <ProductTables dataRefreshTrigger={dataRefreshTrigger} />
    </div>
  );
}


export default App;
