<template>

  <Head>
    <Title>NFL Typer</Title>
    <Meta name="description" content="Type as many NFL players as you can, with custom filters!" />
    <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <Link rel="manifest" href="/site.webmanifest" />
  </Head>
  <div class="flex h-screen w-screen flex-col items-center overflow-hidden bg-[#181818] text-white">
    <Navbar />
    <Game />
    <Foot />
  </div>
</template>
