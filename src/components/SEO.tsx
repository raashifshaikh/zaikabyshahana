import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
}

const SEO = ({ title, description, keywords, author = "Shahana", image }: SEOProps) => {
  const siteName = "ZaikabyShahana";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Delicious Recipes, Made Simple. Explore authentic desi food, cooking tips, and culinary inspiration from Shahana.";
  const defaultKeywords = "recipes, cooking, desi food, indian food, pakistani food, shahana, zaika, simple recipes, home cooking";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;