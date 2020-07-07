import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles';

import Upload from './components/Upload';
import FileList from './components/FileList';

function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    function handleUpload(files) {
        const uploadFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }))

        setUploadedFiles(uploadedFiles.concat(uploadFiles));

        // uploadFiles.forEach(processUpload);
    }

    function processUpload(uploadedFile) {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                updateFile(uploadedFile.id, { progress });
            }
        })
        .then(response => {
            updateFile(uploadedFile.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            });
        })
        .catch(() => {
            updateFile(uploadedFile.id, {
                error: true
            });
        });
    }

    function updateFile(id, data) {
        setUploadedFiles(uploadedFiles.map(uploadedFile => {
            return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
        }));
    }

    return (
        <Container>
            <Content>
                <Upload onUpload={handleUpload} />
                {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
            </Content>
            <GlobalStyle />
        </Container>
    );
}

export default App;
