import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../constants'

interface CsvUploaderProps {
    onDataUploadSuccess: () => void; // Callback to notify App component
    setError: (error: string | undefined) => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onDataUploadSuccess, setError }) => {
    const [csvFile, setCsvFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setCsvFile(file || null);
    };

    const handleUpload = () => {
        if (!csvFile) {
            alert('Please choose a CSV file');
            return;
        }

        const formData = new FormData();
        formData.append('file', csvFile);

        axios
            .post(`${API_BASE_URL}/products/import_csv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log('CSV uploaded successfully:', response.data);
                onDataUploadSuccess(); // Notify App component that data upload was successful
                setError(undefined);
            })
            .catch(error => {
                debugger;
                console.error('Error uploading CSV:', error.response?.data?.error);
                setError(error.response?.data?.error);
            });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    );

};

export default CsvUploader;
