import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

function FileList({ files, onDelete }) {
    return (
        <Container>
            {files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <FileInfo>
                        <Preview src={uploadedFile.preview} />
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>{uploadedFile.readableSize}{' '}
                            {!! uploadedFile.url && <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>}</span>
                        </div>
                    </FileInfo>

                    <div>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#7159C1' }
                                }}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                            />
                        )}

                        {uploadedFile.url && (
                            <a
                                // href="https://secureservercdn.net/45.40.147.116/cc2.900.myftpupload.com/wp-content/uploads/2014/05/lindasui%C3%A7a.jpg"
                                href={uploadedFile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdLink style={{ marginRight: 8 }} size={24} color='#222' />
                            </a>
                        )}
                        {uploadedFile.uploaded && <MdCheckCircle size={24} color='#78E5D5' />}
                        {uploadedFile.error && <MdError size={24} color='#E57878' />}
                    </div>
                </li>
            ))}
        </Container>
    );
}

export default FileList;