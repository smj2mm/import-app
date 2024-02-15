import { FC, useState, useEffect } from 'react';
import './App.css';
import CsvUploader from './components/CsvUploader';
import ProductTables from './components/ProductTables';


const App: FC = () => {
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);

  // This function will be passed to CsvUploader
  const handleDataRefresh = () => {
    setDataRefreshTrigger((prev) => prev + 1); // Increment to trigger a re-render
  };

  return (
    <div className="App">
      <h1>Canix Scales CSV Uploader</h1>
      <CsvUploader onDataUploadSuccess={handleDataRefresh} />
      {/* Pass dataRefreshTrigger as a key to force re-render when it changes */}
      <ProductTables dataRefreshTrigger={dataRefreshTrigger} />
    </div>
  );
}


export default App;
