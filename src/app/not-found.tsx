import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import '~/styles/notfound.css';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function NotFound() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-40'>
            <div className='container mx-auto px-4 text-center'>
                <Card className='mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl'>
                    <CardHeader
                        className='relative h-64 bg-cover bg-center'
                        style={{
                            backgroundImage:
                                "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                        }}
                    >
                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                            <h1 className='text-9xl font-bold text-white'>404</h1>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='mt-4 flex flex-col items-center'>
                            <AlertTriangle className='h-16 w-16 text-red-500' />
                            <CardTitle className='mt-4 text-3xl font-semibold text-gray-900'>
                                Looks like you are lost
                            </CardTitle>
                            <p className='mt-2 text-gray-600'>The page you are looking for is not available!</p>
                            <Link href='/' passHref>
                                <Button className='mt-6 rounded-lg bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700'>
                                    Go to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
