// components/SEO.tsx

import Head from 'next/head';
import {useRouter} from 'next/router';
import React from "react";

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    author?: string;
    image?: string;
    article?: {
        publishedTime: string;
        modifiedTime?: string;
        section?: string;
        tags?: string[];
    };
    ogType?: string;
}

const SEO: React.FC<SEOProps> = ({
                                     title='Todo Board',
                                     description = 'Todo Board for project management',
                                     keywords = ['todo','workspace','zira'],
                                     author = 'Mahafujur Rahaman',
                                     image = '',
                                     article,
                                     ogType = 'website',
                                 }) => {
    const router = useRouter();
    const siteName = 'Your Todo App'; // Replace with your site name

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords.join(', ')}/>
            <meta name="author" content={author}/>

            {/* Open Graph tags */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content={ogType}/>
            <meta property="og:url" content={`https://yourdomain.com${router.asPath}`}/>
            <meta property="og:site_name" content={siteName}/>
            {image && <meta property="og:image" content={image}/>}
            {article && (
                <>
                    <meta property="article:published_time" content={article.publishedTime}/>
                    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime}/>}
                    {article.section && <meta property="article:section" content={article.section}/>}
                    {article.tags && article.tags.map((tag, index) => (
                        <meta key={index} property="article:tag" content={tag}/>
                    ))}
                </>
            )}

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            {image && <meta name="twitter:image" content={image}/>}
        </Head>
    );
};

export default SEO;
