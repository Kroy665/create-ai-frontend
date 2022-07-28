import React, { useState,useRef } from 'react'
import './Home.css';
import axios from 'axios';
function Home() {


    const [askInput, setAskInput] = useState('');
    const [answer, setAnswer] = useState('');
    const [createInput, setCreateInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState('Copy');
    const textAreaRef = useRef(null);

    const handleAskInput = (e) => {
        setAskInput(e.target.value);
    }
    const handleCreateInput = (e) => {
        setCreateInput(e.target.value);
    }

    const handleAsk = (e) => {
        setLoading(true);
        setCopySuccess('Copy');

        var data = JSON.stringify({
            "prompt": "Answer the Question " + askInput
        });

        var config = {
            method: 'post',
            url: 'http://localhost:1337/api/create-ai/create-ans',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('create-ai-token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setAnswer(response.data.data.attributes.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });

    }
    const handleCreate = () => {
        setCopySuccess('Copy');
        setLoading(true);
        var data = JSON.stringify({
            "prompt": "Create an article on " + createInput
        });

        var config = {
            method: 'post',
            url: 'http://localhost:1337/api/create-ai/create-ans',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('create-ai-token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setAnswer(response.data.data.attributes.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }




    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
    };


    return (
        <div>
            {/* create a container in left side of window with h1 tag saying "Create your own AI Services"*/}
            <div className="container">
                <h1 className=''>You can Ask, Create, Do Anything</h1>
                <div className='container d-flex align-items-center justify-content-center'>
                    <div className='m-5 d-flex flex-column'>
                        <div>
                            <h2>Ask your question</h2>
                            <p>Ask your question and get the answer from the AI</p>
                            <div className='m-2 d-flex flex-column align-items-center justify-content-center'>
                                <input onChange={handleAskInput} value={askInput} name='ask' className='m-1 w-100' type='text' placeholder='Ask your question' />
                                <button
                                    onClick={handleAsk}
                                    className='m-1 btn btn-primary'>Ask</button>
                            </div>
                        </div>

                        <div>
                            <h2>Create your own AI Services</h2>
                            <p>Create your own AI Services and get Paragraph, Article, Story from the AI</p>
                            <div className='m-2 d-flex flex-column align-items-center justify-content-center'>
                                <input onChange={handleCreateInput} name='create' className='m-1 w-100' type='text' placeholder='Create anything' />
                                <button
                                    onClick={handleCreate}
                                    className='m-1 btn btn-primary'>Create</button>
                            </div>
                        </div>

                        <div>
                            <h2>Do anything</h2>
                            <p>Do anything and get the answer from the AI</p>
                        </div>
                    </div>

                    <div className='m-5 output-section'>
                        {loading &&
                            <div className='ans-loading'>
                                <div className='spinner-border text-primary' role='status'>
                                    <span className='sr-only'></span>
                                </div>
                            </div>}

                        <p ref={textAreaRef} value={answer} className='p-2 fs-5'>
                            {answer}

                        </p>

                        <div className='textToCopy'>
                            <button onClick={copyToClipboard} className='m-1 btn btn-primary'>{copySuccess}</button>
                        </div>

                    </div>
                    {/* Copy clipboard */}



                </div>
            </div>
        </div>
    )
}

export default Home