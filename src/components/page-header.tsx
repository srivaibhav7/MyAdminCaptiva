const PageHeader = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
        Captive Portal Manager
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
        Easily manage guest accounts for your captive portal. Add new users,
        view existing accounts, and generate unique MAC addresses with AI.
      </p>
    </div>
  );
};

export default PageHeader;
