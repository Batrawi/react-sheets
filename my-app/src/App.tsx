import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

function App(): JSX.Element {
  const [data, setData] = useState<Array<any> | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const contents = e.target?.result;
        if (contents) {
          const workbook = XLSX.read(contents as string, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });

          setData(jsonData as Array<any>);
          console.log(jsonData);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, index: number) => (
              <tr key={index}>
                <td>{row.B}</td>
                <td>{row.C}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;