import Providers from '~/app/providers';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Providers>{children}</Providers>;
}
