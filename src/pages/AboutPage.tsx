import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[60vh]">
      <Helmet>
        <title>About Us | CoreSlash Technologies</title>
        <meta name="description" content="Learn about CoreSlash Technologies, our mission, and our team of visionary engineers." />
        <link rel="canonical" href="https://www.coreslash.com/about" />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">About CoreSlash</h1>
      <p className="text-muted-foreground">Placeholder content for the About page.</p>
    </div>
  );
}
