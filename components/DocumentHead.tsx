/* eslint-disable camelcase */
import React from 'react';
import Head from 'next/head';

const DocumentHead = () => {
    
    return (
        <Head>
            <meta charSet='utf-8' />
            <title>MusicApp</title>
            <link rel='manifest' href='/manifest.json' />
            <meta name='description' content='A music streaming app built with NextJS' />
            <meta name='theme-color' content='#101010'/>
            <link rel='icon' href='/favicon.ico?v=1.0' />
            <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        </Head>
    );
};

export default DocumentHead
