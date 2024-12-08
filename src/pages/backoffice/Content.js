import React, { useState, useEffect } from "react";
import BackOffice from "../../components/BackOffice";
import { PrimeReactProvider } from 'primereact/api';
import { Editor } from 'primereact/editor';
import axios from 'axios';
import config from "../../config";
import Swal from 'sweetalert2';
import { useDebounce } from 'use-debounce';

function Content() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [debouncedText] = useDebounce(text, 1000);

    useEffect(() => {
        const savedText = localStorage.getItem('contentText');
        if (savedText) {
            setText(savedText);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('contentText', debouncedText);
    }, [debouncedText]);

    const saveContent = async () => {
        setLoading(true);
        try {
            const response = await axios.post(config.apiPath + '/content/saveContent', { id: 2, content: text }, { headers: config.headers() });
            console.log('Content saved:', response.data);
            Swal.fire('Success', 'Content saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving content:', error);
            Swal.fire('Error', 'Failed to save content.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e) => {
        const updatedText = e.htmlValue || '';
        if (updatedText.length < 500000000) {
            setText(updatedText);
        } else {
            Swal.fire('Error', 'Content is too large to be saved in localStorage.', 'error');
        }
    };

    return (
        <BackOffice>
            <PrimeReactProvider value={{ unstyled: true }}>
                <div className="card">
                    <Editor value={text} onTextChange={handleTextChange} style={{ height: '500px' }} />
                    <button onClick={saveContent} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </PrimeReactProvider>
        </BackOffice>
    );
}

export default Content;
