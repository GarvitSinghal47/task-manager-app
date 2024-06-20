import { useState } from 'react';

const cleanData = (data: any[], validKays: string[]) => {
  return data.map((obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => validKays.includes(key)));
  });
};

const useReadJsonFile = (validKeys?: string[]) => {
  const [fileData, setFileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (!file) {
        setError('No file selected');
        return;
      }

      if (file.type !== 'application/json') {
        setError('File is not a JSON file');
        return;
      }

      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          try {
            const json = JSON.parse(e.target.result as string);
            validKeys ? setFileData(cleanData(json, validKeys)) : setFileData(json);
          } catch (err) {
            setError('Could not parse JSON');
          }
        }
      };
    }
  };

  return {
    onFileChange,
    fileData,
    error,
  };
};

export default useReadJsonFile;
